const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/addUser', userController.addNewUser);
router.put('/updateUser', userController.updateUser);
router.get('/getUser/:userId', userController.getUserById);
router.get('/getAllUsers', userController.getAllusers);
router.delete('/deleteUser/:userId', userController.deleteUser);

module.exports = router;
