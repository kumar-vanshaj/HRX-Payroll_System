const db = require('../../config/db');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


// ---------------- SALARY COMPONENTS ----------------

exports.addComponent = async (req, res) => {
  const { name, type } = req.body;

  await db.query(
    'INSERT INTO salary_components (name,type) VALUES (?,?)',
    [name, type]
  );

  res.json({ message: 'Component added' });
};


exports.mapComponent = async (req, res) => {
  const { employee_id, component_id, amount } = req.body;

  await db.query(
    `INSERT INTO employee_salary_components
     VALUES (?,?,?)`,
    [employee_id, component_id, amount]
  );

  res.json({ message: 'Mapped' });
};



// ---------------- PAYROLL RUN ----------------

exports.runPayroll = async (req, res) => {
  const { month, year } = req.body;

  const [runResult] = await db.query(
    'INSERT INTO payroll_runs (month,year) VALUES (?,?)',
    [month, year]
  );

  const runId = runResult.insertId;

  const [employees] = await db.query('SELECT * FROM employees');

  for (const emp of employees) {

    const [comps] = await db.query(`
      SELECT sc.type, esc.amount
      FROM employee_salary_components esc
      JOIN salary_components sc
      ON sc.id=esc.component_id
      WHERE esc.employee_id=?`,
      [emp.id]
    );

    let earnings = 0;
    let deductions = 0;

    comps.forEach(c => {
      if (c.type === 'EARNING') earnings += Number(c.amount);
      else deductions += Number(c.amount);
    });

    // simple tax rule (demo but real)
    const tax = earnings * 0.10;

    const net = earnings - deductions - tax;

    const payslipPath = await generatePayslip(emp.id, month, year, earnings, deductions, tax, net);

    await db.query(`
      INSERT INTO payroll_records
      (payroll_run_id,employee_id,gross,tax,deductions,net,payslip_path)
      VALUES (?,?,?,?,?,?,?)`,
      [runId, emp.id, earnings, tax, deductions, net, payslipPath]
    );
  }

  res.json({ message: 'Payroll processed', runId });
};



// ---------------- PDF ----------------

async function generatePayslip(empId, month, year, gross, ded, tax, net) {

  const dir = 'payslips';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = path.join(dir, `emp_${empId}_${month}_${year}.pdf`);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text('Payslip', { align: 'center' });
  doc.moveDown();

  doc.text(`Employee ID: ${empId}`);
  doc.text(`Month: ${month}/${year}`);
  doc.moveDown();

  doc.text(`Gross: ${gross}`);
  doc.text(`Deductions: ${ded}`);
  doc.text(`Tax: ${tax}`);
  doc.text(`Net Pay: ${net}`);

  doc.end();

  return filePath;
}
