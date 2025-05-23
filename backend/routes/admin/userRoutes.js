const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');

// --Admin端
// 获取用户列表
router.get('/', userController.getUsers);
// 创建用户
router.post('/', userController.createUser);
// 更新用户
router.put('/:id', userController.updateUser);
// 删除用户
router.delete('/:id', userController.deleteUser);

module.exports = router;