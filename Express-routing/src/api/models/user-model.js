// src/api/models/user-model.js

// mock data
const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password123',
  },
];

// list all users
const listAllUsers = () => {
  return userItems;
};

// find a user by ID
const findUserById = (id) => {
  return userItems.find((item) => item.user_id === Number(id));
};

// add a new user
const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
};

export {listAllUsers, findUserById, addUser};
