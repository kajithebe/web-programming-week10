// src/api/controllers/user-controller.js

import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

// GET /api/v1/user
const getUser = (req, res) => {
  res.json(listAllUsers());
};

// GET /api/v1/user/:id
const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

// POST /api/v1/user
const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

// PUT /api/v1/user/:id
const putUser = (req, res) => {
  res.json({message: 'User item updated.'});
};

// DELETE /api/v1/user/:id
const deleteUser = (req, res) => {
  res.json({message: 'User item deleted.'});
};

export {getUser, getUserById, postUser, putUser, deleteUser};
