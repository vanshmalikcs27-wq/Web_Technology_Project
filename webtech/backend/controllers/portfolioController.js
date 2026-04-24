const Portfolio = require('../models/Portfolio');

// Create portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const { title, bio, role, email, phone, website, template } = req.body;

    const portfolio = await Portfolio.create({
      userId: req.userId,
      title: title || 'My Portfolio',
      bio: bio || '',
      role: role || '',
      email: email || '',
      phone: phone || '',
      website: website || '',
      template: template || 'minimal'
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio created',
      portfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
};

// Get user portfolios
exports.getUserPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      portfolios
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    res.status(500).json({ error: 'Failed to get portfolios' });
  }
};

// Get portfolio by ID
exports.getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findOne({ _id: id, userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({
      success: true,
      portfolio
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ error: 'Failed to get portfolio' });
  }
};

// Update portfolio
exports.updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, bio, role, email, phone, website, template } = req.body;

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: id, userId: req.userId },
      {
        title,
        bio,
        role,
        email,
        phone,
        website,
        template,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({
      success: true,
      message: 'Portfolio updated',
      portfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
};

// Delete portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findOneAndDelete({ _id: id, userId: req.userId });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({
      success: true,
      message: 'Portfolio deleted'
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
};

// Publish portfolio
exports.publishPortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { published: true },
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json({
      success: true,
      message: 'Portfolio published',
      portfolio,
      publicUrl: `/portfolio/${id}`
    });
  } catch (error) {
    console.error('Publish portfolio error:', error);
    res.status(500).json({ error: 'Failed to publish portfolio' });
  }
};
