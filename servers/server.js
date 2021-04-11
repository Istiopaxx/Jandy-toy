
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`express is running on ${port}`);
});



//public directory open
app.use('/public', express.static('./public'));
app.get('/', (req, res) => {
  res.redirect(302, '/public')
});


io.on('connection', (socket) => {
  console.log('a user connected');
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

app.use('/api', (req, res) => res.json(data));


