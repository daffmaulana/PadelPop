const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed], (err, result) => {
    if (err) return res.status(500).json({ message: err });
    res.json({ message: 'Register berhasil' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'User tidak ditemukan' });
    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Password salah' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

exports.googleCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role }, // role HARUS ikut
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
  );
  
  // Kirim token via query string ke frontend
  res.redirect(`/google-success.html?token=${token}`);
};
