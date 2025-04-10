const jwt = require('jsonwebtoken');
const SECRET_KEY = '202202532';

// 使用JWT进行身份验证
module.exports = function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // 返回给前端user数据
        next();
    });
};
