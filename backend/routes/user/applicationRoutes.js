
const express = require('express');
const router = express.Router();
const applicationController = require('../../controllers/user/applicationController');

// 报名竞赛
router.post('/', applicationController.createApplication);
// 竞赛报名一次，控制按钮
router.get('/user/:userId', applicationController.getUserApplications);
// 获取用户报名的竞赛
router.get('/user/:userId/competitions', applicationController.getUserRegisteredCompetitions);
// 获取被批准的竞赛信息
router.get('/user/:userId/approved', applicationController.getUserApprovedCompetitions);

module.exports = router;
