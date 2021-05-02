

//const Problem = require('../models/problem');
//const Grading = require('../models/grading');



// dummy data
const data = {
    "state": {
        "id": 0,
        "timestamp": 0,
        "data": {},
        "tickets": [],
        "isEnd": false,
    },
    "tickets": {
        "maxTimestamp": 1,
        "ticketOfTime": [
            {
                "id": 0,
                "timestamp": 0,
                "start": 6,
                "end": 1,
            },
        ],
    },
};


exports.respond_state = function(req, res) {
    const state = req.state;
    const token = req.authToken;
    const ret = {
        "token": token,
        "state": state,
    }
    res.status(200).json(ret);
}


// start api 호출 시 발급된 토큰으로 채점DB에 초기 state와 티켓배열을 넣음
// 성공하면 req.state 에 초기 state를 첨부
exports.create_first_state = function(req, res, next) {
    /* problem db에서 가져오는 경우   
    const scenario = Problem
        .find_by_problemId(req.body.problemId)
        .find_senario();
    */

    /* 랜덤 생성
    const scenario = new Promise((resolve, reject) => {
        generate_data(problemId, (ret, err) => {
            if(err) reject(err);
            resolve(ret);
        })
    });
    */

    /* 생성한 시나리오(json)를 채점DB에 gradingKey를 key, 시나리오를 value로 하여 저장
    // 시나리오는 firstState json객체와 사용자가 처리해야 할 ticket의 배열로 이루어진 json객체
    scenario.then((sc) => {
        Grading.hset(req.gradingKey, sc, (err, reply) => {
            if(err) return new Error('cannot store data');
            req.state = sc.state;
            next();
        })
    })
    .catch((e) => {
        console.log("Error: " + e);
        res.status(500).send('DB set failed');
    });
    */

    
    //temporary implementation
    req.state = data.state;
    next();
}


// 채점DB에서 state를 가져와 req에 첨부
exports.get_state = function(req, res, next) {
    /*
    Grading.hget(req.gradingKey, (err, reply) => {
        if(err) res.status(500).send('no data in Grading DB');
        req.state = reply;
        next();
    });
    */

    // temporary implementation
    req.state = data.state;
    next();
}












