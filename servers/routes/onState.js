const express = require('express');
const router = express.Router();


router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('something broke!');
})


router.use('/', function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
})












module.exports = router;