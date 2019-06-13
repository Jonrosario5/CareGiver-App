const express = require('express');
const router = express.Router();
const controllers = require('../Controllers');


// Show User's Patients 

router.get('/:id',controllers.patient.show);

// Create Patient 

router.post('/:id', controllers.patient.create);


// Update Patient

router.put('/:id', controllers.patient.create);

// Add another User to Patient's Guardian List

router.put('/addGuardian/:id', controllers.patient.addGuardian);

// Delete

router.delete('/:id', controllers.patient.delete);

module.exports = router;