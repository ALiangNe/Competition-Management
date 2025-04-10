const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/authenticateToken'); // 导入认证中间件

// 获取个人信息，首先通过认证中间件判断是否存在token
router.get('/', authenticateToken, profileController.getProfile); 
// 修改个人信息
router.put('/', authenticateToken, profileController.updateUserProfile); 

module.exports = router;
