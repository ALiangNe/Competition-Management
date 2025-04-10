const express = require('express');
const router = express.Router();
const competitionController = require('../../controllers/user/competitionController');

// 获取所有比赛
router.get('/', competitionController.getAllCompetitions);

module.exports = router;
