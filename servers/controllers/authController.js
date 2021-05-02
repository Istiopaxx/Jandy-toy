const jwt = require('jsonwebtoken');

// const User = require('../models/user');
// const Problem = require('../models/problem');


const crypto = require('crypto');


exports.make_token = function(req, res, next) {
    const { userId, problemId } = req.body;
    const secret = req.app.get('jwt-secret');

    console.log(userId, problemId);

    /*
    const check = function(id) {
        return new Promise((resolve, reject) => {
            if(!id) {
                reject('no data');
            }
            else {
                resolve(id);
            }
        });
    }
    */

    const make_token = function(user, problem) {
        if(!user || !problem) {
            res.status(400).send('No user/problem');
        }
        const p = new Promise((resolve, reject) => {
            jwt.sign(
                {
                    "user": user,
                    "problem": problem,
                },
                secret,
                {
                    expiresIn: "10m",
                              
                },
                (err, token) => {
                    if(err) reject(err);
                    resolve(token);
                }
            )
        });
        return p;
    }

    const append_token = function(token) {
        req.authToken = token;
    }


    const append_grading_key = function() {
        const token = req.authToken;
        req.gradingKey = crypto.createHash('SHA1').update(token).digest('hex');
        console.log(req.gradingKey);
        next();
    }

    /*
    // 데이터베이스 쿼리가 promise를 반환한다고 가정
    const userInstance = User.findOneByUserId(userId);
    const problemInstance = Problem.findOneByProblemId(problemId);
    */


    // temporary implementation
    let userInstance = new Promise((resolve, reject) => {
        resolve(userId);
        reject('');
    })
    let problemInstance = new Promise((resolve, reject) => {
        resolve(problemId);
        reject('');
    })
    

    Promise.all([userInstance, problemInstance]).then(values => {
        make_token(values[0], values[1])
            .then(append_token)
            .then(append_grading_key)
            .catch(e => {
                console.log("Error: " + e);
                res.status(500).send('something broke in auth');
            })
    });
    
}




exports.verify_token = function(req, res, next) {
    // read the token from header or url
    const token = req.header('x-auth-token') || req.query.token;

    //token does not exist
    if(!token) {
        return res.status(401).send('No x-auth-token');
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if(err) reject(err);
            resolve(decoded);
        })
    });
    p.then((decoded) => {
        req.decoded = decoded;
        req.authToken = token;
        req.gradingKey = crypto.createHash('SHA1').update(token).digest('hex');
        console.log(req.gradingKey);
        next()
    })
        .catch(e => {
            res.status(401).send('Unauthorized');
        });
}



