const db = require('../models/db');

exports.getAllFields = (req, res) => {
  const sql = `
    SELECT f.id, f.name, f.location, f.price_per_hour, b.date, b.time_start, b.time_end
    FROM fields f
    LEFT JOIN bookings b ON f.id = b.field_id
    ORDER BY f.id, b.date, b.time_start
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("SQL error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const fieldsMap = new Map();

    result.forEach(row => {
      if (!fieldsMap.has(row.id)) {
        fieldsMap.set(row.id, {
          id: row.id,
          name: row.name,
          location: row.location,
          price_per_hour: row.price_per_hour,
          bookings: []
        });
      }

      if (row.date) {
        fieldsMap.get(row.id).bookings.push({
          date: row.date,
          time_start: row.time_start,
          time_end: row.time_end
        });
      }
    })
    const fields = Array.from(fieldsMap.values());
    res.json(fields);
  });
};

exports.getFieldById = (req, res) => {
  db.query('SELECT * FROM fields WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.createField = (req, res) => {
  const { name, location, price_per_hour } = req.body;
  db.query('INSERT INTO fields (name, location, price_per_hour) VALUES (?, ?, ?)',
    [name, location, price_per_hour], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Lapangan ditambahkan' });
    });
};

exports.updateField = (req, res) => {
  const { name, location, price_per_hour } = req.body;
  db.query('UPDATE fields SET name=?, location=?, price_per_hour=? WHERE id=?',
    [name, location, price_per_hour, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Lapangan diperbarui' });
    });
};

exports.deleteField = (req, res) => {
  db.query('DELETE FROM fields WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Lapangan dihapus' });
  });
};
