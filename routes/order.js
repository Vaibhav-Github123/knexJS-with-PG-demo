const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

router.get("/all",orderController.getAll)
router.post('/add',orderController.create);
router.get('/getbyid/:id',orderController.getById)
router.put('/update/:id',orderController.update)
router.delete('/delete/:id',orderController.delete);

module.exports = router