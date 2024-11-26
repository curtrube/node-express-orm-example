import { Router } from 'express';
import { initORM } from '../../db.js';
import { EntityData } from '@mikro-orm/core';
import { User } from './user.entity.js';

export const userRouter = Router();

userRouter.post('/sign-up', async (req, res) => {
  const db = await initORM();
  const body = req.body as EntityData<User>;
  //   if (!body.email || !body.firstName || !body.lastName || !body.password) {
  //     throw new Error('One of required fields is missing: email, firstName, lastName, password');
  //   }
  //   const user = new User(body.email, body.password, body.firstName, body.lastName);
  //   const dbResponse = await
  if (await db.user.exists(body.email as string)) {
    throw new Error('This email is already registered, maybe you want to sign in?');
  }
});
