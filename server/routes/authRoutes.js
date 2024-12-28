const express = require('express');
const { register, login, addAdmin } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/admin/create',addAdmin)

module.exports = router;