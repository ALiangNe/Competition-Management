const Registration = require('../models/Registration');

exports.createRegistration = async (req, res) => {
    try {
        const registrationId = await Registration.create(req.body);
        res.status(201).json({ message: 'Registration created successfully', registrationId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
