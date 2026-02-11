const router = require('express').Router();
const ctrl = require('./crm.controller');

const auth = require('../../middleware/auth');
const role = require('../../middleware/role');


// clients
router.post('/clients', auth, role(1,6), ctrl.createClient);
router.get('/clients', auth, ctrl.listClients);

// leads
router.post('/leads', auth, role(1,6), ctrl.createLead);
router.get('/leads', auth, ctrl.listLeads);

// interactions
router.post('/interactions', auth, role(1,6), ctrl.addInteraction);
router.get('/interactions/:leadId', auth, ctrl.getLeadInteractions);

// deals
router.post('/deals', auth, role(1,6), ctrl.createDeal);
router.put('/deals/:id', auth, role(1,6), ctrl.updateDealStage);
router.get('/pipeline', auth, ctrl.pipelineSummary);

module.exports = router;
