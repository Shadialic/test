const express = require('express');
const router = express()
const authController=require('../controllers/authController')
const employeeController=require('../controllers/employeeController');
const upload = require('../utils/multer');

// Post 

router.post('/register',authController.addAdmin)
router.post('/login',authController.verifyLogin)
router.post('/addEmployee',upload.single("image"),employeeController.addEmployee)
router.get('/getEmployees',employeeController.getEmployee)
router.put('/edit',employeeController.editEmployee)
router.put('/delete/:id',employeeController.deleteEmployee)





module.exports = router;