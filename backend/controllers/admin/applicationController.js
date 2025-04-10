const Application = require('../../models/admin/Application');

// 获取所有用户的申请
exports.getAllApplications = async (req, res) => {
    try {
      const applications = await Application.findAll();
      res.status(200).json(applications);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

// 同意或者批准
exports.updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { state, state_description } = req.body;
  
    try {
      console.log(`Updating application ID ${id} to state ${state} with description "${state_description}"`);
      if (!id) {
        console.error("Application ID is undefined");
        res.status(400).json({ message: 'Application ID is required' });
        return;
      }
      await Application.updateStatus(id, state, state_description);
      console.log(`Application ID ${id} updated successfully`);
      res.status(200).json({ message: 'Application status updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
