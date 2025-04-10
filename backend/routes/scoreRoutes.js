const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// 管理员添加分数
router.post('/', scoreController.createScore);

module.exports = router;
