
// load dependency
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const startRouter = require('./routes/start');
const onStateRouter = require('./routes/onState');
const actionRouter = require('./routes/action');



const fs = require('fs');
const parse = require('csv-parse/lib/sync');
// load config

const port = process.env.PORT || 3001;



// =========================================================



let tickets = fs.readFileSync("./servers/p0.txt", 'utf8');

const outputRaw = parse(tickets);

let output = [];

for(let i = 0; i < outputRaw.length; i++) {
    output.push([]);
    for(let j = 0; j < outputRaw[i].length; j++) {
        let int = parseInt(outputRaw[i][j]);
        output[i].push(int);
    }
}

console.log(output);

const firstdata = {
    "gradingData" : {
        "timestamp": 0,
        "states": [
            {
                "id": 0,
                "floor": 1,
                "passengers": [],
                "status": "STOPPED"
            },
        ],
        "tickets": [],
        "isEnd": false,
    },
    "entire_tickets": []
};

for(let i = 0; i < output.length; i++) {
    const id = output[i][1];
    const timestamp = output[i][0];
    const start = output[i][2];
    const end = output[i][3];

    const temp = {
        "id": id,
        "timestamp": timestamp,
        "start": start,
        "end": end
    };
    firstdata.entire_tickets.push(temp);
}

console.log(firstdata.entire_tickets);




let dataList = {};

exports.create_data = function(token) {
    dataList[token] = firstdata;
    return firstdata;
};

exports.select_data = function(token) {
    return dataList[token];
};

exports.update_data = function(token, data) {
    dataList[token] = data;
};

exports.delete_data = function(token) {
    delete dataList[token];
};























// =========================================================
const app = express();
const server = http.createServer(app);


//parse json & url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logging
app.use(morgan('dev'));

//set secret key for jwt


// server open
server.listen(port, () => {
    console.log(`express is running on ${port}`);
});



// api route
app.use('/api/start', startRouter);
app.use('/api/onState', onStateRouter);
app.use('/api/action', actionRouter);

let data = {
    "problems": [
        {
            "id": "1",
            "name": "Elevator",
            "explanation" : "엘리베이터 제어 시스템"
        },
        {
            "id": "2",
            "name": "SNS",
            "explanation" : "팔로잉 추천을 사용자들의 팔로잉이 각각 20명 이상이 되도록 하는 추천시스템 구현"
        }
    ]
};
app.get('/api', (req, res) => res.json(data));









const dataaa = {
    "gradingData" : {
        "timestamp": 0,
        "states": [
            {
                "id": 0,
                "floor": 6,
                "passengers": [
                    {
                        "id": 0,
                        "timestamp": 0,
                        "start": 6,
                        "end": 1
                    }
                ],
                "status": "OPENED"
            },
        ],
        "tickets": [],
        "isEnd": false,
    },
    "entire_tickets": [
        {
            "id": 0,
            "timestamp": 0,
            "start": 6,
            "end": 1,
        },
    ]
};








