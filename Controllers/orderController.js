const Order = require("../config/db");

  exports.getAll = async (req, res, next) => {
    try {
      const users = await Order('orders as o')
    //   .join("products", "products.id", "orders.product_id")
    //   .select(
    //     "orders.*",
    //     "products.product_name",
    //     "products.prodict_price"
    //   );
    .select("o.*", "p.id as product_id", "p.product_name as product_name", "p.prodict_price as prodict_price",
     "o.product_name as product_name","o.customer_name as customer_name","o.quantity as quantity","o.price as price","o.total as total",
     "u.name as name", "u.email as email", "u.bio as bio")
    .leftJoin("products as p", "o.product_id", "p.id")
    .leftJoin("users as u", "p.user_id", "u.id");

    const ordersWithproductsAnduser = users.reduce((acc, user) => {
        const existingUser = acc.find(u => u.id === user.id);
    
        if (existingUser) {
          if (user.product_id) {
            const existingPost = existingUser.products.find(p => p.product_id === user.product_id);
    
            if (existingPost) {
              if (user.name) {
                existingPost.users.push({ name: user.name,
                                           email: user.email,
                                           bio: user.bio
                                          });
              }
            } else {
              existingUser.products.push({
                product_id: user.product_id,
                product_name: user.product_name,
                prodict_price: user.prodict_price,
                users: user.name ? [{ name: user.name,
                                                email: user.email,
                                                bio: user.bio }] : []
              });
            }
          }
        } else {
          const newUser = {
            id: user.id,
            customer_name: user.customer_name,
            quantity: user.quantity,
            total: user.total,
            created_at: user.created_at,
            updated_at: user.updated_at,
            products: []
          };
    
          if (user.product_id) {
            newUser.products.push({
              product_id: user.product_id,
              product_name: user.product_name,
              prodict_price: user.prodict_price,
              users: user.name ? [{ name: user.name,
                                    email: user.email,
                                    bio: user.bio }] : []
            });
          }
    
          acc.push(newUser);
        }
    
        return acc;
      }, []);



      res.status(200).json(ordersWithproductsAnduser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.getById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await Order('orders').where('id', id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.create = async (req, res, next) => {
    try {
      const {product_name,customer_name,quantity,price,total, product_id} = req.body;
      const user = await Order('orders').insert({
        product_name: product_name,
        customer_name: customer_name,
        quantity: quantity,
        price: price,
        total: quantity * price,
        product_id: product_id
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {product_name,customer_name,quantity,price,total, product_id} = req.body;
      const user = await Order('orders').where('id',id).update({
        product_name: product_name,
        customer_name: customer_name,
        quantity: quantity,
        price: price,
        total: total,
        product_id: product_id
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await Order('orders').where('id', id).delete();
      res.json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }