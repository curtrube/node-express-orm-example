import { MikroORM } from '@mikro-orm/postgresql'; // or any other driver package
import config from './mikro-orm.config.js';
import { User } from './modules/user/user.entity.js';
import { Transaction } from './modules/transaction/transaction.entity.js';

// initialize the ORM, loading the config file dynamically
const orm = await MikroORM.init(config);

// recreate the database schema
await orm.schema.refreshDatabase();

// fork first to have a separate context
const em = orm.em.fork();

// create new user entity instance
const user = new User();
user.email = 'foo@bar.com';
user.firstName = 'Foo';
user.lastName = 'Bar';
user.password = '123456';

// first mark the entity with `persist()`, then `flush()`
await em.persist(user).flush();

// clear the context to simulate fresh request
em.clear();

const transaction = em.create(Transaction, {
  merchant: 'Amazon',
  amount: 29.99,
  user: user.id,
});

await em.flush();

// const transactionWithUser = await em.findOne(Transaction, transaction.id, {
//   populate: ["user"],
// });
// console.log(transactionWithUser);

// populating User.articles collection
const newUser = await em.findOneOrFail(User, 1, { populate: ['transactions'] });
console.log(newUser);
