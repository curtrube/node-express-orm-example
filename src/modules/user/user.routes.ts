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

// Register new user
userRouter.post('/sign-up', async (req, res) => {
  const db = await initORM();

  const dto = userSchema.parse(req.body);

  if (await db.user.exists(dto.email)) {
    throw new Error('This email is already registered, maybe you want to sign in?');
    // res.status(400).send('This email is already registered, maybe you want to sign in?');
  }

  const user = db.user.create(dto);
  await db.em.flush(); // no need for explicit `em.persist()` when we use `em.create()`

  console.log(`User with Id: ${user.id} created successfully`);
  res.status(201).json(user);
});

// Login existing user
userRouter.post('/sign-in', async (req, res) => {
  const db = await initORM();
  const { email, password } = req.body as { email: string; password: string }; // what if one of these is null?
  try {
    const user = await db.user.login(email, password);
  } catch (err) {
    res.status(401).json({ message: 'Invalid email address or password' });
  }
});

// // get('/profile')
// userRouter.get('/profile', (req, res) => {
//   res.send('profile');
// });
