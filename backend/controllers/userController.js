const db = require('../models/db');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
  db.query('SELECT id, name, email, role FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!password) return res.status(400).json({ message: 'Password is required' });
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashed, role], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User created' });
    });
};

exports.updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const fields = [name, email, role];
  let sql = 'UPDATE users SET name = ?, email = ?, role = ?';

  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    sql = 'UPDATE users SET name = ?, email = ?, role = ?, password = ?';
    fields.push(hashed);
  }

  sql += ' WHERE id = ?';
  fields.push(req.params.id);

  db.query(sql, fields, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated' });
  });
};

exports.deleteUser = (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted' });
  });
};
