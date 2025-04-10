const express = require('express');
const router = express.Router();
const applicationController = require('../../controllers/admin/applicationController');

// 获取所有用户的申请
router.get('/', applicationController.getAllApplications);
// 批准或者拒绝申请
router.put('/:id', applicationController.updateApplicationStatus);

module.exports = router;
