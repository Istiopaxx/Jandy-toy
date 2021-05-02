const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const stateController = require('../controllers/stateController');

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('something broke!');
})


router.use('/', function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

//verifying token
router.get('/', authController.verify_token);
//get state from Grading DB
router.get('/', stateController.get_state);
//respond state;
router.get('/', stateController.respond_state);











module.exports = router;