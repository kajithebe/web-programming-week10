// src/api/routes/user-router.js

import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Routes for /api/v1/user
userRouter.route('/').get(getUser).post(postUser);
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
