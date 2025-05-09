const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createCase, editCase, getUserCases } = require('../controllers/caseController');

router.post('/', auth, createCase);
router.put('/:id', auth, editCase);
router.get('/', auth, getUserCases);

module.exports = router;
