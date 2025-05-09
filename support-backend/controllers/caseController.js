const { SupportCase } = require('../models');

exports.createCase = async (req, res) => {
  try {
    const newCase = await SupportCase.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.user.id
    });
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ message: 'Error creating case' });
  }
};

exports.editCase = async (req, res) => {
  try {
    const supportCase = await SupportCase.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!supportCase) return res.status(404).json({ message: 'Case not found' });

    supportCase.title = req.body.title;
    supportCase.description = req.body.description;
    await supportCase.save();
    res.json(supportCase);
  } catch (err) {
    res.status(500).json({ message: 'Error updating case' });
  }
};

exports.getUserCases = async (req, res) => {
  try {
    const cases = await SupportCase.findAll({ where: { userId: req.user.id } });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cases' });
  }
};
