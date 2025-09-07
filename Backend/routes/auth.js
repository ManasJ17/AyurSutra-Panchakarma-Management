// Auth routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Registration
router.post('/register', authController.register);
// Login
router.post('/login', authController.login);
// Protected route
router.get('/protected', auth, authController.protected);

module.exports = router;
