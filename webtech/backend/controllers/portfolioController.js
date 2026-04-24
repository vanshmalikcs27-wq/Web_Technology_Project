const { getRow, getAllRows, runQuery } = require('../db');

// Create portfolio
async function createPortfolio(req, res) {
  try {
    const { title, bio, role, email, phone, website, template } = req.body;

    const result = await runQuery(
      'INSERT INTO portfolios (userId, title, bio, role, email, phone, website, template) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.userId, title || 'My Portfolio', bio || '', role || '', email || '', phone || '', website || '', template || 'minimal']
    );

    res.status(201).json({
      success: true,
      message: 'Portfolio created',
      portfolioId: result.id
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ error: 'Failed to create portfolio' });
  }
}

// Get user portfolios
async function getUserPortfolios(req, res) {
  try {
    const portfolios = await getAllRows(
      'SELECT * FROM portfolios WHERE userId = ? ORDER BY createdAt DESC',
      [req.userId]
    );

    res.json({
      success: true,
      portfolios
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    res.status(500).json({ error: 'Failed to get portfolios' });
  }
}

// Get portfolio by ID
async function getPortfolioById(req, res) {
  try {
    const { id } = req.params;

    const portfolio = await getRow(
      'SELECT * FROM portfolios WHERE id = ? AND userId = ?',
      [id, req.userId]
    );

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Get related data
    const skills = await getAllRows('SELECT skill FROM skills WHERE portfolioId = ?', [id]);
    const experience = await getAllRows('SELECT * FROM experience WHERE portfolioId = ?', [id]);
    const education = await getAllRows('SELECT * FROM education WHERE portfolioId = ?', [id]);
    const projects = await getAllRows('SELECT * FROM projects WHERE portfolioId = ?', [id]);

    res.json({
      success: true,
      portfolio: {
        ...portfolio,
        skills: skills.map(s => s.skill),
        experience,
        education,
        projects
      }
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ error: 'Failed to get portfolio' });
  }
}

// Update portfolio
async function updatePortfolio(req, res) {
  try {
    const { id } = req.params;
    const { title, bio, role, email, phone, website, template, skills, experience, education, projects } = req.body;

    // Check ownership
    const portfolio = await getRow('SELECT * FROM portfolios WHERE id = ? AND userId = ?', [id, req.userId]);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Update portfolio
    await runQuery(
      'UPDATE portfolios SET title = ?, bio = ?, role = ?, email = ?, phone = ?, website = ?, template = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [title, bio, role, email, phone, website, template, id]
    );

    // Update skills
    await runQuery('DELETE FROM skills WHERE portfolioId = ?', [id]);
    if (skills && skills.length > 0) {
      for (const skill of skills) {
        await runQuery('INSERT INTO skills (portfolioId, skill) VALUES (?, ?)', [id, skill]);
      }
    }

    // Update experience
    if (experience) {
      await runQuery('DELETE FROM experience WHERE portfolioId = ?', [id]);
      for (const exp of experience) {
        await runQuery(
          'INSERT INTO experience (portfolioId, title, company, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?)',
          [id, exp.title, exp.company, exp.startDate, exp.endDate, exp.description]
        );
      }
    }

    // Update education
    if (education) {
      await runQuery('DELETE FROM education WHERE portfolioId = ?', [id]);
      for (const edu of education) {
        await runQuery(
          'INSERT INTO education (portfolioId, school, degree, field, startDate, endDate) VALUES (?, ?, ?, ?, ?, ?)',
          [id, edu.school, edu.degree, edu.field, edu.startDate, edu.endDate]
        );
      }
    }

    // Update projects
    if (projects) {
      await runQuery('DELETE FROM projects WHERE portfolioId = ?', [id]);
      for (const proj of projects) {
        await runQuery(
          'INSERT INTO projects (portfolioId, title, description, link) VALUES (?, ?, ?, ?)',
          [id, proj.title, proj.description, proj.link]
        );
      }
    }

    res.json({
      success: true,
      message: 'Portfolio updated'
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
}

// Delete portfolio
async function deletePortfolio(req, res) {
  try {
    const { id } = req.params;

    // Check ownership
    const portfolio = await getRow('SELECT * FROM portfolios WHERE id = ? AND userId = ?', [id, req.userId]);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Delete cascading data will be handled by foreign keys
    await runQuery('DELETE FROM portfolios WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Portfolio deleted'
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ error: 'Failed to delete portfolio' });
  }
}

// Publish portfolio
async function publishPortfolio(req, res) {
  try {
    const { id } = req.params;

    const portfolio = await getRow('SELECT * FROM portfolios WHERE id = ? AND userId = ?', [id, req.userId]);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    await runQuery('UPDATE portfolios SET published = 1 WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Portfolio published',
      publicUrl: `/portfolio/${id}`
    });
  } catch (error) {
    console.error('Publish portfolio error:', error);
    res.status(500).json({ error: 'Failed to publish portfolio' });
  }
}

module.exports = {
  createPortfolio,
  getUserPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  publishPortfolio
};
