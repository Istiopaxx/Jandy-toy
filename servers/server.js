

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');



const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;


const startRouter = require('./routes/start');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));




server.listen(port, () => {
  console.log(`express is running on ${port}`);
});


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




app.use('/api/start', startRouter);

app.get('/api', (req, res) => res.json(data));


