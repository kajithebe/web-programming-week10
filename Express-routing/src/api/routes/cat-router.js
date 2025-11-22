// src/api/routes/cat-router.js

import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

// Routes for /api/v1/cat
catRouter.route('/').get(getCat).post(postCat);
catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
