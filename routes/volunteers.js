const express = require('express');
const {getVolunteers, addVolunteers} = require('../controller/volunteers');

const router = express.Router();

router.route('/').get(getVolunteers).post(addVolunteers);


module.exports = router;