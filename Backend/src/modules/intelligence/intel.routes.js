console.log("INTEL ROUTES LOADED");

const router = require('express').Router();
const ctrl = require('./intel.controller');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const upload = require('../../config/upload');

router.post(
  '/resume',
  auth,
  role(1,2),
  upload.single('resume'),
  ctrl.uploadResume
);

router.post('/review', auth, role(1,2,3), ctrl.addReview);

router.post('/attrition/:empId', auth, role(1,2), ctrl.computeAttrition);

router.get('/ping', (req,res)=>res.json({ok:true}));

module.exports = router;
