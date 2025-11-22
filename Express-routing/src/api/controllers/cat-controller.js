// src/api/controllers/cat-controller.js

import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

// GET /api/v1/cat
const getCat = (req, res) => {
  res.json(listAllCats());
};

// GET /api/v1/cat/:id
const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

// POST /api/v1/cat
const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

// PUT /api/v1/cat/:id
const putCat = (req, res) => {
  // hard-coded response for assignment
  res.json({message: 'Cat item updated.'});
};

// DELETE /api/v1/cat/:id
const deleteCat = (req, res) => {
  // hard-coded response for assignment
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
