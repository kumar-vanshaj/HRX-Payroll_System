const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (name, email, password_hash, role_id) VALUES (?,?,?,?)',
      [name, email, hash, role_id]
    );

    res.json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM users WHERE email=?',
      [email]
    );

    if (!rows.length)
      return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
