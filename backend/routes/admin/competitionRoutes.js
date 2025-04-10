const express = require('express');
const router = express.Router();
const competitionController = require('../../controllers/admin/competitionController');

// 获取所有竞赛
router.get('/', competitionController.getCompetitions);
// 删除单个竞赛
router.delete('/:id', competitionController.deleteCompetition);
// 修改单个竞赛
router.put('/:id', competitionController.updateCompetition);
// 添加单个竞赛
router.post('/', competitionController.addCompetition); 
module.exports = router;
