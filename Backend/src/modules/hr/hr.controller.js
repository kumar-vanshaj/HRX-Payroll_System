const db = require('../../config/db');


// ---------------- DEPARTMENTS ----------------

exports.createDepartment = async (req, res) => {
  const { name } = req.body;

  await db.query(
    'INSERT INTO departments (name) VALUES (?)',
    [name]
  );

  res.json({ message: 'Department created' });
};


exports.listDepartments = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM departments');
  res.json(rows);
};


// ---------------- EMPLOYEES ----------------

exports.createEmployee = async (req, res) => {
  const { user_id, department_id, designation, join_date, base_salary } = req.body;

  await db.query(
    `INSERT INTO employees
     (user_id, department_id, designation, join_date, base_salary)
     VALUES (?,?,?,?,?)`,
    [user_id, department_id, designation, join_date, base_salary]
  );

  res.json({ message: 'Employee created' });
};


exports.listEmployees = async (req, res) => {
  const [rows] = await db.query(`
    SELECT e.*, u.name, u.email, d.name as department
    FROM employees e
    JOIN users u ON e.user_id=u.id
    LEFT JOIN departments d ON e.department_id=d.id
  `);

  res.json(rows);
};


// ---------------- ATTENDANCE ----------------

exports.markAttendance = async (req, res) => {
  const {
    employee_id,
    date,
    check_in,
    check_out,
    hours_worked,
    overtime_hours
  } = req.body;

  await db.query(
    `INSERT INTO attendance
     (employee_id,date,check_in,check_out,hours_worked,overtime_hours)
     VALUES (?,?,?,?,?,?)`,
    [employee_id, date, check_in, check_out, hours_worked, overtime_hours]
  );

  res.json({ message: 'Attendance marked' });
};


exports.getAttendance = async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM attendance WHERE employee_id=?',
    [req.params.empId]
  );

  res.json(rows);
};


// ---------------- LEAVE ----------------

exports.applyLeave = async (req, res) => {
  const { employee_id, leave_type, start_date, end_date, reason } = req.body;

  await db.query(
    `INSERT INTO leave_requests
     (employee_id,leave_type,start_date,end_date,status,reason)
     VALUES (?,?,?,?, 'PENDING', ?)`,
    [employee_id, leave_type, start_date, end_date, reason]
  );

  res.json({ message: 'Leave applied' });
};


exports.approveLeave = async (req, res) => {
  await db.query(
    `UPDATE leave_requests
     SET status='APPROVED', approved_by=?
     WHERE id=?`,
    [req.user.id, req.params.id]
  );

  res.json({ message: 'Leave approved' });
};
// ---- USERS FOR DROPDOWN ----
exports.listUsers = async (req,res) => {
  const [rows] = await db.query(
    "SELECT id, email FROM users ORDER BY email"
  );
  res.json(rows);
};


// ---- DEPARTMENTS FOR DROPDOWN ----
exports.listDepartments = async (req,res) => {
  const [rows] = await db.query(
    "SELECT id, name FROM departments ORDER BY name"
  );
  res.json(rows);
};
