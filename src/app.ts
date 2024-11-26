import express from 'express';
import { initORM } from './db.js';
import { EntityData, MikroORM, RequestContext } from '@mikro-orm/postgresql';
import mikroOrmConfig from './mikro-orm.config.js';
import { User } from './modules/user/user.entity.js';
import { userRouter } from './modules/user/user.routes.js';

// Initialize the MikroORM instance
// async function initORM() {
//   const orm = await MikroORM.init(mikroOrmConfig);
//   return orm;
// }

export async function bootstrap(port = 3000) {
  const db = await initORM();
  const app = express();

  app.use(express.json());

  // Middleware to manage MikroORM's request context
  // app.use((req, res, next) => {
  //   RequestContext.create(db.em, next); // Create a new DB context for each request
  // });

  app.use(userRouter);

  app.get('/user', async (req, res) => {
    const user = await db.em.findOneOrFail(User, 1);
    res.send(user);
  });

  // app.post('/sign-up', async (req, res) => {
  //   //   const db = initORM();
  //   const body = req.body as EntityData<User>;
  //   console.log(body);

  //   if (!body.email || !body.firstName || !body.lastName || !body.password) {
  //     const err = new Error('One of required fields is missing: email, firstName, lastName, password');
  //   }
  //   const user = new User(body.email, body.password, body.firstName, body.lastName);
  //   await db.em.persist(user).flush();
  //   db.user.
  // });

  // Start the server
  const server = app.listen(port, () => {
    console.log(`App on ${port}`);
  });

  return { app, server };
}
