const db = require('../config/db');

module.exports = userService = {
  getAll: async () => {
    const users = await db("users");
    return users;
  },
  getById: async (id) => {
    const user = await db("users").where("id", id);
    return user;
  },
  create: async (user) => {
    const users = await db("users").insert(user);
    return users;
  },
  update: async (id, user) => {
    const users = await db("users").where("id", id).update({
      name: user.name,
      email: user.email,
      password: user.password,
      bio: user.bio
    });
    return users;
  },
  delete: async (id) => {
    const users = await db("users").where("id", id).del();
    return users;
  },
};