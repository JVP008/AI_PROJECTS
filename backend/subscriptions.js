const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

// Get all subscriptions for a user
router.get('/', auth, (req, res) => {
  db.all('SELECT * FROM subscriptions WHERE user_id = ?', [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving subscriptions' });
    }
    res.json(rows);
  });
});

// Add a new subscription
router.post('/', auth, (req, res) => {
  const { name, price, renewal_date } = req.body;

  if (!name || !price || !renewal_date) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  db.run(
    'INSERT INTO subscriptions (user_id, name, price, renewal_date) VALUES (?, ?, ?, ?)',
    [req.user.id, name, price, renewal_date],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error adding subscription' });
      }
      res.status(201).json({ id: this.lastID, name, price, renewal_date });
    }
  );
});

// Delete a subscription
router.delete('/:id', auth, (req, res) => {
  db.run('DELETE FROM subscriptions WHERE id = ? AND user_id = ?', [req.params.id, req.user.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting subscription' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json({ message: 'Subscription deleted successfully' });
  });
});

module.exports = router;
