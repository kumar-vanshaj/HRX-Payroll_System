const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());   // ← MUST be here

app.use('/auth', require('./modules/auth/auth.routes'));
app.use('/hr', require('./modules/hr/hr.routes'));
app.use('/payroll', require('./modules/payroll/payroll.routes'));
app.use('/crm', require('./modules/crm/crm.routes'));
app.use('/intel', require('./modules/intelligence/intel.routes'));
app.use('/reports', require('./modules/reports/reports.routes'));



const db = require('./config/db');

app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 as test');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const auth = require('./middleware/auth');

app.get('/protected', auth, (req,res)=>{
  res.json({ user: req.user });
});
app.get('/debug-users', async (req,res)=>{
  const [rows] = await db.query("SELECT id,email FROM users");
  res.json(rows);
});
