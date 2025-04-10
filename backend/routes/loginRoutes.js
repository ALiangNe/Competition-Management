const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// 登录
router.post('/', loginController.loginUser);

module.exports = router;
