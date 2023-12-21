const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");


router.get("/",userController.getAll)
router.post('/add',userController.create)
router.get('/getbyid/:id',userController.getById)
router.put('/update/:id',userController.update)
router.delete('/delete/:id',userController.delete)


module.exports = router;