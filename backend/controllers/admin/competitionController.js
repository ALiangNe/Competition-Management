const Competition = require('../../models/admin/Competition');

exports.getCompetitions = async (req, res) => {
  const { title, location, start, end } = req.query;
  try {
    const competitions = await Competition.getFilteredCompetitions(title, location, start, end);
    res.status(200).json(competitions);
  } catch (error) {
    console.error('Failed to fetch competitions:', error);
    res.status(500).json({ message: 'Failed to fetch competitions' });
  }
};


exports.deleteCompetition = async (req, res) => {
  const { id } = req.params;
  try {
    await Competition.deleteCompetition(id);
    res.status(200).json({ message: 'Competition deleted successfully' });
  } catch (error) {
    console.error('Failed to delete competition:', error);
    res.status(500).json({ message: 'Failed to delete competition' });
  }
};

exports.updateCompetition = async (req, res) => {
  const { id } = req.params;
  const competitionData = req.body;
  try {
    await Competition.updateCompetition(id, competitionData);
    res.status(200).json({ message: 'Competition updated successfully' });
  } catch (error) {
    console.error('Failed to update competition:', error);
    res.status(500).json({ message: 'Failed to update competition' });
  }
};

exports.addCompetition = async (req, res) => {
  const competitionData = req.body;
  try {
    await Competition.addCompetition(competitionData);
    res.status(201).json({ message: 'Competition added successfully' });
  } catch (error) {
    console.error('Failed to add competition:', error);
    res.status(500).json({ message: 'Failed to add competition' });
  }
};
