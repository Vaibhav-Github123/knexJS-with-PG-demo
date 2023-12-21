const express = require("express");   

const app = express();

app.use(express.json());

const userRouter = require("./routes/user");
const productRouter = require("./routes/product"); 
const ordersRouter = require("./routes/order");

app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/order', ordersRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});