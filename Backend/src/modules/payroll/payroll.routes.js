const router = require('express').Router();
const ctrl = require('./payroll.controller');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/components', auth, role(1,2,4), ctrl.addComponent);
router.post('/map', auth, role(1,2,4), ctrl.mapComponent);
router.post('/run', auth, role(1,4), ctrl.runPayroll);

module.exports = router;
