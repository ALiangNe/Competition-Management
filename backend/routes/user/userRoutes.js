const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');

// 获取所有用户
router.get('/', userController.getAllUsers);

module.exports = router;
