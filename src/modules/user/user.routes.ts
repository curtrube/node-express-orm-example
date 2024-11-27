import { Router } from 'express';
import { initORM } from '../../db.js';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const userRouter = Router();

userRouter.post('/sign-up', async (req, res) => {
  const db = await initORM();

  const dto = userSchema.parse(req.body);

  if (await db.user.exists(dto.email)) {
    throw new Error('This email is already registered, maybe you want to sign in?');
  }

  const user = db.user.create(dto);
  await db.em.flush(); // no need for explicit `em.persist()` when we use `em.create()`

  console.log(`User ${user.id} created`);

  res.send(user);
});
