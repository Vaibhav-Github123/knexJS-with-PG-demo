const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");


router.get("/all",productController.getAll)
router.post('/add',productController.create);
router.get('/getbyid/:id',productController.getById)
router.put('/update/:id',productController.update)
router.delete('/delete/:id',productController.delete);


module.exports = router;