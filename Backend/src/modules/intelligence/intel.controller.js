

const db = require('../../config/db');
const fs = require('fs');


// -------- RESUME PARSER --------

function extractSkills(text) {
  const skills = ['python','java','node','react','sql','aws','django'];
  const found = [];

  const lower = text.toLowerCase();

  skills.forEach(s => {
    if (lower.includes(s)) found.push(s);
  });

  return found;
}


exports.uploadResume = async (req, res) => {

  const filePath = req.file.path;

  // read as text file
  const text = fs.readFileSync(filePath, 'utf8').toLowerCase();

  const skills = extractSkills(text);
  const score = skills.length * 10;

  const { name, email } = req.body;

  await db.query(
    `INSERT INTO candidates
     (name,email,resume_path,parsed_skills,score)
     VALUES (?,?,?,?,?)`,
    [name, email, filePath, skills.join(','), score]
  );

  res.json({ skills, score });
};




// -------- PERFORMANCE REVIEW --------

exports.addReview = async (req, res) => {
  const { employee_id, score, notes, review_date } = req.body;

  await db.query(
    `INSERT INTO performance_reviews
     VALUES (NULL,?,?,?,?)`,
    [employee_id, score, notes, review_date]
  );

  res.json({ message: 'Review added' });
};



// -------- ATTRITION SCORE --------

exports.computeAttrition = async (req, res) => {
  const empId = req.params.empId;

  const [[att]] = await db.query(
    `SELECT AVG(hours_worked) avg_hours
     FROM attendance WHERE employee_id=?`,
    [empId]
  );

  const [[perf]] = await db.query(
    `SELECT AVG(score) avg_score
     FROM performance_reviews WHERE employee_id=?`,
    [empId]
  );

  let risk = 50;

  if (att.avg_hours < 6) risk += 20;
  if (perf.avg_score < 5) risk += 20;

  risk = Math.min(risk, 100);

  await db.query(
    `REPLACE INTO attrition_scores VALUES (?,?)`,
    [empId, risk]
  );

  res.json({ risk_score: risk });
};
