const Competition = require('../../models/user/Competition');

exports.getAllCompetitions = async (req, res) => {
  const { title, location, start, end } = req.query;
  try {
    let competitions = await Competition.findAll();

    if (title) {
      competitions = competitions.filter(competition => competition.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (location) {
      competitions = competitions.filter(competition => competition.location.toLowerCase().includes(location.toLowerCase()));
    }

    if (start && end) {
      competitions = competitions.filter(competition => {
        const registrationDeadline = new Date(competition.registrationDeadline);
        return registrationDeadline >= new Date(start) && registrationDeadline <= new Date(end);
      });
    }

    res.status(200).json(competitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


