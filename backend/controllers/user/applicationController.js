
const Application = require('../../models/user/Application');
// 报名竞赛
exports.createApplication = async (req, res) => {
    try {
        const applicationId = await Application.create(req.body);
        res.status(201).json({ message: 'Application created successfully', applicationId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// 竞赛报名一次
exports.getUserApplications = async (req, res) => {
    const { userId } = req.params;
    try {
        const applications = await Application.findByUser(userId);
        res.status(200).json(applications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// 获取用户报名的竞赛
exports.getUserRegisteredCompetitions = async (req, res) => {
    const { userId } = req.params;
    try {
        const competitions = await Application.findRegisteredCompetitionsByUser(userId);
        res.status(200).json(competitions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// 获取被批准的竞赛信息
exports.getUserApprovedCompetitions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const approvedCompetitions = await Application.findApprovedCompetitionsByUserId(userId);
        res.status(200).json(approvedCompetitions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};