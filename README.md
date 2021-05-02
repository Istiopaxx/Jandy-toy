
# Jandy toy project

Interactive, state-action 문제를 풀기 위한 채점 api 시스템을 구현하는 프로젝트입니다.

- - -

## 채점 api 서버

포트 3001번을 사용하고 있습니다. 서버를 시작하려면 루트 디렉토리에서 node ./servers/app.js 로 시작.

## api 통신

http://localhost:3001/api/ 
여기서 api 통신이 가능합니다. 
/api/start 에서는 start api를 호출하여 유저 인증을 위한 토큰을 발급받고, 문제의 상태를 채점DB에 저장하게 됩니다.
/api/onState 에서는 onState api를 호출하여 현재 상태를 받습니다.
/api/action 에서는 action api를 호출하여 어떤 명령을 내릴지 전달합니다. / 미구현









