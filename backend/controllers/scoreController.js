const Score = require('../models/Score');

exports.createScore = async (req, res) => {
  const { submission_id, user_id, score, comment } = req.body;

  console.log('Received data:', req.body); // 添加调试日志

  if (!submission_id || !user_id || !score) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newScore = await Score.create({ submission_id, user_id, score, comment });
    res.status(201).json(newScore);
  } catch (error) {
    console.error('Error creating score:', error.message, error.stack);
    res.status(500).json({ message: 'Error creating score', error: error.message });
  }
};
