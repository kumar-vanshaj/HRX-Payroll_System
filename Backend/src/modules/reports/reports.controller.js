const db = require('../../config/db');
const { createObjectCsvWriter } = require('csv-writer');


// -------- Payroll Summary --------

exports.payrollSummary = async (req, res) => {
  const [rows] = await db.query(`
    SELECT year, month,
           SUM(gross) total_gross,
           SUM(net) total_net,
           SUM(tax) total_tax
    FROM payroll_records pr
    JOIN payroll_runs r ON pr.payroll_run_id = r.id
    GROUP BY year, month
  `);

  res.json(rows);
};


// -------- Department Salary Cost --------

exports.deptCost = async (req, res) => {
  const [rows] = await db.query(`
    SELECT d.name dept, SUM(e.base_salary) total_salary
    FROM employees e
    JOIN departments d ON e.department_id=d.id
    GROUP BY d.name
  `);

  res.json(rows);
};


// -------- Attrition Dashboard --------

exports.attritionDashboard = async (req, res) => {
  const [rows] = await db.query(`
    SELECT e.id, u.name, a.risk_score
    FROM attrition_scores a
    JOIN employees e ON a.employee_id=e.id
    JOIN users u ON e.user_id=u.id
    ORDER BY a.risk_score DESC
  `);

  res.json(rows);
};


// -------- CSV Export --------

exports.exportEmployees = async (req, res) => {

  const [rows] = await db.query(`
    SELECT e.id, u.name, u.email, e.designation, e.base_salary
    FROM employees e
    JOIN users u ON e.user_id=u.id
  `);

  const writer = createObjectCsvWriter({
    path: 'employees.csv',
    header: [
      {id:'id',title:'ID'},
      {id:'name',title:'Name'},
      {id:'email',title:'Email'},
      {id:'designation',title:'Role'},
      {id:'base_salary',title:'Salary'}
    ]
  });

  await writer.writeRecords(rows);

  res.download('employees.csv');
};
