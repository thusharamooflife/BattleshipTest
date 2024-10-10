const GameModel = require('../models/gameModel');
const game = new GameModel();

exports.getIndex = (req, res) => {
  res.render('index', { grid: game.getGrid() });
};

exports.shoot = (req, res) => {
  const { target } = req.body;

  if (!target) {
    return res.status(400).json({ error: 'No target provided' });
  }

  const result = game.processShot(target);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json(result);
};

exports.getGrid = (req, res) => {
  res.json({ grid: game.getGrid() });
};
