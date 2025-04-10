const express = require('express');
const cors = require('cors');
const path = require('path');

// --公用
const registerRoutes = require('./routes/registrationRoutes');// 用户注册
const loginRoutes = require('./routes/loginRoutes');// 用户登录
const uploadRoutes = require('./routes/uploadRoutes');// 上传个人头像
const profileRoutes = require('./routes/profileRoutes');// 获取，修改个人信息
const submissionRoutes = require('./routes/submissionRoutes');// 用户上传列表，管理员获取作评列表
const scoreRoutes = require('./routes/scoreRoutes'); // 管理员评分
// --Admin端
const userRoutesAdmin = require('./routes/admin/userRoutes');// 对用户的增删改查
const competitionRoutesAdmin = require('./routes/admin/competitionRoutes');// 对竞赛的增删改查
const applicationRoutesAdmin = require('./routes/admin/applicationRoutes');// 获取申请，处理申请
// --User端
const userRoutes = require('./routes/user/userRoutes');// 获取用户（没有用到）
const competitionRoutes = require('./routes/user/competitionRoutes');// 获取竞赛
const applicationRoutes = require('./routes/user/applicationRoutes'); // 用户报名，获取报名竞赛信息

const app = express();
const port = 5000; // 前端5000端口

app.use(cors()); // 跨域中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public'))); // 静态文件

// --公用
app.use('/api/register', registerRoutes);// 用户注册
app.use('/api/login', loginRoutes);// 用户登录
app.use('/api/upload', uploadRoutes);// 上传个人头像
app.use('/api/profile', profileRoutes);// 获取，修改个人信息
app.use('/api/submissions', submissionRoutes);// 用户上传列表，管理员获取作评列表
app.use('/api/scores', scoreRoutes);// 管理员评分
// --Admin端
app.use('/api/admin/users', userRoutesAdmin);// 对用户的增删改查
app.use('/api/admin/competitions', competitionRoutesAdmin);// 对竞赛的增删改查
app.use('/api/admin/applications', applicationRoutesAdmin);// 获取申请，处理申请
// --User端
app.use('/api/users', userRoutes);// 获取用户（没有用到）
app.use('/api/competitions', competitionRoutes);// 获取竞赛
app.use('/api/application', applicationRoutes); // 用户报名，获取报名竞赛信息

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
