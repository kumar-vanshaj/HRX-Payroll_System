const router = require('express').Router();
const ctrl = require('./hr.controller');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.get('/users', ctrl.listUsers);
router.get('/departments', ctrl.listDepartments);



// Department
router.post('/departments', auth, role(1,2), ctrl.createDepartment);
router.get('/departments', auth, ctrl.listDepartments);

// Employee
router.post('/employees', auth, role(1,2), ctrl.createEmployee);
router.get('/employees', auth, ctrl.listEmployees);

// Attendance
router.post('/attendance', auth, ctrl.markAttendance);
router.get('/attendance/:empId', auth, ctrl.getAttendance);

// Leave
router.post('/leave', auth, ctrl.applyLeave);
router.post('/leave/:id/approve', auth, role(1,2,3), ctrl.approveLeave);

module.exports = router;
