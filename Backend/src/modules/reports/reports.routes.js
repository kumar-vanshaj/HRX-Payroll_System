const router = require('express').Router();
const ctrl = require('./reports.controller');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.get('/payroll-summary', auth, role(1,4), ctrl.payrollSummary);
router.get('/dept-cost', auth, role(1,2,4), ctrl.deptCost);
router.get('/attrition', auth, role(1,2), ctrl.attritionDashboard);
router.get('/employees-csv', auth, role(1,2), ctrl.exportEmployees);

module.exports = router;
