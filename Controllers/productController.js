const Product = require("../config/db");

  exports.getAll = async (req, res, next) => {
    try {
      const users = await Product('products as p')
      // .join("users", "users.id", "products.user_id")
      // .select(
      //   "products.*",
      //   "users.name",
      //   "users.bio",
      //   "users.email"
      // );
      .select("p.*", "p.id as product_id", "p.product_name as product_name", "p.prodict_price as prodict_price",
     "o.product_name as product_name","o.customer_name as customer_name","o.quantity as quantity","o.price as price","o.total as total",
     "u.name as name", "u.email as email", "u.bio as bio")
    .leftJoin("orders as o", "o.product_id", "p.id")
    .leftJoin("users as u", "p.user_id", "u.id");

    const ProductsWithUsersAndOrders = users.reduce((acc, post) => {
      const existingPost = acc.find(p => p.product_id === post.product_id);
    
    
      if (!existingPost) {
        const newPost = {
          product_id: post.product_id,
          product_name: post.product_name,
          prodict_price: post.prodict_price,
          user: {
            name: post.name,
            email: post.email
          },
          orders: []
        };
        if (post.customer_name) {
          newPost.orders.push({ customer_name: post.customer_name,
                                  quantity: post.quantity,
                                  total: post.total });
        }
        acc.push(newPost);
      } else {
        if (post.customer_name) {
          existingPost.orders.push({ customer_name: post.customer_name,
                                        quantity: post.quantity,
                                        total: post.total });
        }
      }
    
      return acc;
    }, []);
    
    
      res.status(200).json(ProductsWithUsersAndOrders);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.getById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await Product('products').where('id', id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.create = async (req, res, next) => {
    try {
      const {product_name, prodict_price, user_id} = req.body;
      const user = await Product('products').insert({
        product_name: product_name,
        prodict_price: prodict_price,
        user_id: user_id
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const {product_name, prodict_price, user_id} = req.body;
      const user = await Product('products').where('id',id).update({
        product_name: product_name,
        prodict_price: prodict_price,
        user_id: user_id
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  exports.delete = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await Product('products').where('id', id).delete();
      res.json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }