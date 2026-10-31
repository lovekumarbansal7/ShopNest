const express = require('express');
const { getAdminStats } = require('../controllers/analytics.controller');
const { protect } = require('../middlewares/auth.middleware');
const { admin } = require('../middlewares/admin.middleware');

const router = express.Router();

router.get('/', protect, admin, getAdminStats);

module.exports = router;