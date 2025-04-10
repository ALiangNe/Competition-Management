// 多文件上传
const express = require('express');
const router = express.Router();
const multer = require('multer');
const submissionController = require('../controllers/submissionController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upload');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// 使用数组来存放上传的文件， 修改为多文件上传
router.post('/upload', upload.array('files'), submissionController.uploadSubmission); 
// 管理员获取作品列表
router.get('/list', submissionController.getSubmissionList); 

module.exports = router;
