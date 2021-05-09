
# Jandy toy project

Interactive, state-action 문제를 풀기 위한 채점 api 시스템을 구현하는 프로젝트입니다.

- - -

## 채점 api 서버

포트 3001번을 사용하고 있습니다. 서버를 시작하려면 루트 디렉토리에서 `node ./servers/app.js` 로 시작.
혹은 `npm run dev`로 시작해도 됩니다.

## api 통신

http://localhost:3001/api/ 
여기서 api 통신이 가능합니다. 
/api/start 에서는 start api를 호출하여 유저 인증을 위한 토큰을 발급받고, 문제의 상태를 채점DB에 저장하게 됩니다. 
/api/onState 에서는 onState api를 호출하여 현재 상태를 받습니다. 
/api/action 에서는 action api를 호출하여 어떤 명령을 내릴지 전달합니다.


## curl 테스트

쉘을 두개 띄우고, 둘다 루트 디렉토리로 이동합니다. 한 쉘에서는 `npm run dev`로 서버를 시작하고, 나머지 한 쉘에서 `curl` 프로그램을 통해 api 서버에 통신을 보냅니다.
`curl`이 기본으로 깔려있지 않은 window 운영체제에서는 설치해야 합니다.
1. 루트 디렉토리에 curl_commands.txt 파일에서 start api에 보내는 http 요청을 입력하여 보냅니다.
```
curl -X POST -d @sendfile.json -H "Content-Type: application/json" http://localhost:3001/api/start
```
response로 온 json 바디에서 토큰 부분을 복사합니다.

2. onState api에 헤더에 토큰을 붙여넣고 요청을 보냅니다.
```
curl -X GET \
-H "x-auth-token: (start api 호출에서 받은 토큰)" \
http://localhost:3001/api/onState

```

3. action api에 헤더에 토큰을 붙혀넣고 요청을 보냅니다.
```
curl -X POST -d @commands.json \
-H "x-auth-token: (start api 호출에서 받은 토큰)" \
-H "Content-Type: application/json" \
http://localhost:3001/api/action
```

## 직접 테스트 코드 작성

api 호출과 제어를 위한 테스트 코드를 직접 작성하여 통신할 수도 있습니다. 



