const express = require('express');
const crypto = require('crypto');
const router = express.Router();



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


// verifying user_id&problem_id
router.post('/', function(req, res, next) {
    const data = req.body;

    const user_id = data.user_id;
    const problem_id = data.problem_id;
    // not yet implemented - connect to user, problem DB and verifying
    
    console.log(user_id);
    console.log(problem_id);

    next();
});


// making authToken with problem-id, user-id
router.post('/', function(req, res, next) {
    const user_id = req.body.user_id;
    const problem_id = req.body.problem_id;
    
    const authToken = crypto
        .createHash('sha256')
        .update(user_id + problem_id)
        .digest('hex');
    
    
    req.authToken = authToken;
    console.log(authToken);

    next();
});


// make a row at grading DB
// Key : authToken  Value : problem_id's first state
router.post('/', function(req, res, next) {
    // not yet implemented

    next();
});


// response json - token, first state
router.post('/', function(req, res, next) {
    const authToken = req.authToken;
    // const firstState = req.firstState;
    const firstState = {};

    const ret = {
        "token": authToken,
        "state": firstState,
    }
    console.log(ret);

    res.status(200).json(ret);
});



module.exports = router;