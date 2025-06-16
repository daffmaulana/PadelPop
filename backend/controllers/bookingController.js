const db = require('../models/db');

exports.createBooking = (req, res) => {
  const { field_id, date, time_start, time_end } = req.body;
  const user_id = req.user.id;

  const checkQuery = `
    SELECT * FROM bookings 
    WHERE field_id = ? AND date = ? AND 
    ((time_start < ? AND time_end > ?) OR (time_start < ? AND time_end > ?))`;

  db.query(checkQuery, [field_id, date, time_end, time_start, time_start, time_end], (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'Lapangan sudah dibooking pada waktu itu' });
    }

    db.query('INSERT INTO bookings (user_id, field_id, date, time_start, time_end) VALUES (?, ?, ?, ?, ?)',
      [user_id, field_id, date, time_start, time_end], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Booking berhasil' });
      });
  });
};

exports.getMyBookings = (req, res) => {
  db.query('SELECT * FROM bookings WHERE user_id = ?', [req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// Get all bookings (admin)
exports.getAllBookings = (req, res) => {
  
  const sql = `
    SELECT b.id, b.user_id, u.name as user_name, f.name as field_name, f.id as field_id, b.date, b.time_start, b.time_end
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN fields f ON b.field_id = f.id
    ORDER BY b.date DESC, b.time_start
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.cancelBooking = (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  db.query('DELETE FROM bookings WHERE id = ? AND user_id = ?', [bookingId, userId], (err, result) => {
    if (err || result.affectedRows === 0) return res.status(400).json({ message: 'Booking tidak ditemukan' });
    res.json({ message: 'Booking dibatalkan' });
  });
};



// Get one booking by ID (admin)
exports.getBookingById = (req, res) => {
  const sql = `
    SELECT b.id, b.user_id, u.name as user_name, f.name as field_name, f.id as field_id, b.date, b.time_start, b.time_end
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN fields f ON b.field_id = f.id
    WHERE b.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Booking not found' });
    res.json(results[0]);
  });
};

// Create booking (admin)
exports.createBookingAdmin = (req, res) => {
  const { user_id, field_id, date, time_start, time_end } = req.body;
  const sql = `
    INSERT INTO bookings (user_id, field_id, date, time_start, time_end)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [user_id, field_id, date, time_start, time_end], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Booking created', bookingId: result.insertId });
  });
};

// Update booking (admin)
exports.updateBooking = (req, res) => {
  const { field_id, date, time_start, time_end } = req.body;
  const sql = `
    UPDATE bookings
    SET field_id = ?, date = ?, time_start = ?, time_end = ?
    WHERE id = ?
  `;
  db.query(sql, [field_id, date, time_start, time_end, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Booking updated' });
  });
};

// Delete booking (admin)
exports.deleteBooking = (req, res) => {
  db.query('DELETE FROM bookings WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Booking deleted' });
  });
};