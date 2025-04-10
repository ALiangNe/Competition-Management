//  多文件上传

const Submission = require('../models/Submission');

exports.uploadSubmission = async (req, res) => {
  const files = req.files;
  const { user_id, competition_id, description } = req.body; // 获取description字段
  if (!files || files.length === 0) {
    return res.status(400).send({ message: 'Please upload files' });
  }

  try {
    for (const file of files) {
      const submissionData = {
        user_id,
        competition_id,
        file_path: `/public/upload/${file.filename}`,
        description // 保存description字段
      };
      await Submission.create(submissionData);
    }
    res.status(200).send({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

exports.getSubmissionList = async (req, res) => {
  try {
    const submissions = await Submission.getSubmissionList();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Failed to fetch submission list:', error);
    res.status(500).json({ message: 'Failed to fetch submission list' });
  }
};
