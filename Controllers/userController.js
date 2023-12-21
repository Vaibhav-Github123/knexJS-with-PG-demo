const User = require('../config/db')

exports.getAll = async (req, res, next) => {
    try {
      const users = await User("users as u")
      .select("u.*", "p.id as product_id", "p.product_name as product_name", "p.prodict_price as prodict_price", "o.product_name as product_name","o.customer_name as customer_name","o.quantity as quantity","o.price as price","o.total as total")
      .leftJoin("products as p", "p.user_id", "u.id")
      .leftJoin("orders as o", "o.product_id", "p.id");

    const usersWithproductsAndorders = users.reduce((acc, user) => {
      const existingUser = acc.find(u => u.id === user.id);
  
      if (existingUser) {
        if (user.product_id) {
          const existingPost = existingUser.products.find(p => p.product_id === user.product_id);
  
          if (existingPost) {
            if (user.customer_name) {
              existingPost.orders.push({ customer_name: user.customer_name,
                                         quantity: user.quantity,
                                         total: user.total
                                        });
            }
          } else {
            existingUser.products.push({
              product_id: user.product_id,
              product_name: user.product_name,
              prodict_price: user.prodict_price,
              orders: user.customer_name ? [{ customer_name: user.customer_name,
                                              quantity: user.quantity,
                                              total: user.total }] : []
            });
          }
        }
      } else {
        const newUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
          products: []
        };
  
        if (user.product_id) {
          newUser.products.push({
            product_id: user.product_id,
            product_name: user.product_name,
            prodict_price: user.prodict_price,
            orders: user.customer_name ? [{ customer_name: user.customer_name,
                                  quantity: user.quantity,
                                  total: user.total }] : []
          });
        }
  
        acc.push(newUser);
      }
  
      return acc;
    }, []);

      res.status(200).json(usersWithproductsAndorders);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  exports.getById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User('users').where({id: id});
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.create = async (req, res, next) => {
    try {
      const {name,email,password,bio} = req.body
     
      const user = await User('users').insert({
        name: name,
        email: email,
        password: password,
        bio: bio
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.update = async (req, res, next) => {
    try {
      const id = req.params.id
      const {name,email,password,bio} = req.body
      const user = await User('users').where('id', id).update({
        name: name,
        email: email,
        password: password,
        bio: bio
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.delete = async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await User('users').where('id', id).delete();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }