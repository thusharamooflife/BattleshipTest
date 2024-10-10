const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getIndex);

router.post('/shoot', gameController.shoot);

router.get('/grid', gameController.getGrid);

module.exports = router;
