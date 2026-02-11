const db = require('../../config/db');


// -------- CLIENTS --------

exports.createClient = async (req, res) => {
  const { company_name, contact_person, email } = req.body;

  await db.query(
    `INSERT INTO clients (company_name,contact_person,email)
     VALUES (?,?,?)`,
    [company_name, contact_person, email]
  );

  res.json({ message: 'Client created' });
};

exports.listClients = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM clients');
  res.json(rows);
};



// -------- LEADS --------

exports.createLead = async (req, res) => {
  const { company_name, contact_person, status, source, assigned_to } = req.body;

  await db.query(
    `INSERT INTO leads
     (company_name,contact_person,status,source,assigned_to)
     VALUES (?,?,?,?,?)`,
    [company_name, contact_person, status, source, assigned_to]
  );

  res.json({ message: 'Lead created' });
};


exports.listLeads = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM leads');
  res.json(rows);
};



// -------- INTERACTIONS --------

exports.addInteraction = async (req, res) => {
  const { lead_id, type, summary, interaction_date } = req.body;

  await db.query(
    `INSERT INTO interactions
     (lead_id,type,summary,interaction_date)
     VALUES (?,?,?,?)`,
    [lead_id, type, summary, interaction_date]
  );

  res.json({ message: 'Interaction logged' });
};


exports.getLeadInteractions = async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM interactions WHERE lead_id=?',
    [req.params.leadId]
  );

  res.json(rows);
};



// -------- DEAL PIPELINE --------

exports.createDeal = async (req, res) => {
  const { client_id, value, stage, probability } = req.body;

  await db.query(
    `INSERT INTO deals
     (client_id,value,stage,probability)
     VALUES (?,?,?,?)`,
    [client_id, value, stage, probability]
  );

  res.json({ message: 'Deal created' });
};


exports.updateDealStage = async (req, res) => {
  const { stage, probability } = req.body;

  await db.query(
    `UPDATE deals SET stage=?, probability=? WHERE id=?`,
    [stage, probability, req.params.id]
  );

  res.json({ message: 'Deal updated' });
};


exports.pipelineSummary = async (req, res) => {
  const [rows] = await db.query(`
    SELECT stage, COUNT(*) count, SUM(value) total_value
    FROM deals
    GROUP BY stage
  `);

  res.json(rows);
};
