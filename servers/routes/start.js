const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const stateController = require('../controllers/stateController');




// error catch
router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('something broke!');
});


// logging time
router.all('/', function(req, res, next) {
    console.log('Time:', Date.now());
    next();
});


// making authToken with problemId, userId
router.post('/', authController.make_token);

// make a row at grading DB
// Key : authToken  Value : state and array of tickets
router.post('/', stateController.create_first_state);

// response json - token, first state
router.post('/', stateController.respond_state);


module.exports = router;