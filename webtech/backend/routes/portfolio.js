const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const { verifyToken } = require('../middleware/auth');

// All portfolio routes require authentication
router.post('/', verifyToken, portfolioController.createPortfolio);
router.get('/', verifyToken, portfolioController.getUserPortfolios);
router.get('/:id', verifyToken, portfolioController.getPortfolioById);
router.put('/:id', verifyToken, portfolioController.updatePortfolio);
router.delete('/:id', verifyToken, portfolioController.deletePortfolio);
router.post('/:id/publish', verifyToken, portfolioController.publishPortfolio);

module.exports = router;
