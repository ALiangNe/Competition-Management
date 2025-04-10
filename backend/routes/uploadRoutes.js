const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// 定义上传中间件
const upload = multer({ storage: storage });

// 上传头像单个文件
router.post('/', upload.single('avatar'), uploadController.uploadFile);

module.exports = router;
