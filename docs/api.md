
# API
- - -


<a name="startApi"></a>

## start API
채점을 식별하는 token을 발급하고 초기 state를 반환한다.

#### Request

```http
POST /start
Content-Type: application/json
```
```json
{
    "userId" : "test",
    "problemId" : "elevator"
}
```

| Name | Description |
| --------- | ----------- |
| `userId` | 채점자의 ID |
| `problemId` | 채점할 문제 ID |

#### Response

| Status Code | 설명 |
| ----------- | ---- |
| 200 OK | 성공 |
| 400 Bad Request | `userId` 또는 `problemId`가 유효하지 않음 |
| 500 Internal Server Error | 서버 에러, 문의 필요 |

성공일 때 response body는 json 형식이고, 예시는 아래와 같다.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsInByb2JsZW0iOiJlbGV2YXRvciIsImlhdCI6MTYxOTc4NTAxMywiZXhwIjoxNjE5Nzg1NjEzfQ.sz8vYKR2kPvJ3NLErTZ3m6J1_GWloX7JNhFLyKUGreY",
    "gradingData": {
        "timestamp": 0,
        "states": [],
        "tickets": [],
        "isEnd": false,
    },
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | string | Token (Request header의 `x-auth-token` 값과 동일) |
| `timestamp` | integer | 현재 timestamp |
| `states` | array of [`state`](#state) | 문제 환경의 상태 |
| `tickets` | array of [`ticket`](#ticket) | 처리해야 할 요청 |
| `isEnd` | boolean | 채점 완료 여부 |





<a name="onStateApi"></a>

## onState API
현재 `timestamp` 기준으로 처리해야하는 `ticket`의 목록을 포함한 `state`를 반환한다.

#### Request

```http
GET /oncalls
X-Auth-Token: {Token}
```

| Name | Description |
| ---- | ----------- |
| `X-Auth-Token` | **start API**의 결과로 받은 token |

#### Response

| Status Code | 설명 |
| ----------- | ---- |
| 200 OK | 성공 |
| 401 Unauthorized | `X-Auth-Token` Header가 없거나 잘못됨 |
| 500 Internal Server Error | 서버 에러, 문의 필요 |

성공일 때 response body는 json 형식이고, 예시는 아래와 같다.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsInByb2JsZW0iOiJlbGV2YXRvciIsImlhdCI6MTYxOTc4NTAxMywiZXhwIjoxNjE5Nzg1NjEzfQ.sz8vYKR2kPvJ3NLErTZ3m6J1_GWloX7JNhFLyKUGreY",
    "gradingData": {
        "timestamp": 0,
        "states": [],
        "tickets": [],
        "isEnd": false,
    },
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | string | Token (Request header의 `x-auth-token` 값과 동일) |
| `timestamp` | integer | 현재 timestamp |
| `states` | array of [`state`](#state) | 문제 환경의 상태 |
| `tickets` | array of [`ticket`](#ticket) | 처리해야 할 요청 |
| `isEnd` | boolean | 채점 완료 여부 |






<a name="action-api"></a>

## Action API
주어진 state에 대해 정의된 규칙에 따라 명령을 실행한다.

**이후 수정 사항**
+ `commands`에는 모든 엘리베이터의 명령이 포함되어 있어야 하며, 각 엘리베이터 당 하나의 명령만 전달할 수 있다.
+ 예를 들어 엘리베이터가 두 대인 경우 두 대 각각에 대한 명령이 있어야 한다.

### Request

```http
POST /action
X-Auth-Token: {Token}
Content-Type: application/json
```

| Name | Description |
| ---- | ----------- |
| `X-Auth-Token` | **Start API**의 결과로 받은 token |

```json
{
  "commands": [
    {
      "elevator_id": 0,
      "command": "OPEN",
    },
    {
      "elevator_id": 1,
      "command": "STOP"
    }
  ]
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| `commands` | array of [`Command`](#command) | 엘리베이터를 제어하기 위한 명령 |




### Response

| Status Code | 설명 |
| ----------- | ---- |
| 200 OK | 성공 |
| 400 Bad Request | 해당 명령을 실행할 수 없음 (문제 조건에 알맞지 않은 명령) |
| 401 Unauthorized | `X-Auth-Token` Header가 잘못됨 |
| 500 Internal Server Error | 서버 에러, 문의 필요 |

성공일 때 response body는 JSON 형식이며 아래와 같다.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsInByb2JsZW0iOiJlbGV2YXRvciIsImlhdCI6MTYxOTc4NTAxMywiZXhwIjoxNjE5Nzg1NjEzfQ.sz8vYKR2kPvJ3NLErTZ3m6J1_GWloX7JNhFLyKUGreY",
  "gradingData": {
    "timestamp": 8,
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
      {
        "id": 1,
        "floor": 1,
        "passengers": [],
        "status": "STOPPED"
      }
    ],
    "tickets": [],
    "isEnd": false
  }
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| `token` | string | Token (Request header의 `X-Auth-Token` 값과 동일)
| `timestamp` | integer | 현재 timestamp
| `states` | array of [`state`](#state) | 문제 환경의 상태 |
| `tickets` | array of [`ticket`](#ticket) | 처리해야 할 요청 |
| `isEnd` | boolean | 채점 완료 여부 |






## Resource

<a name="data"></a>
### State
데이터의 상태를 표현한다. 
엘리베이터 문제에서는 엘리베이터 하나의 상태를 표현한다.

```json
{
  "id": 0,
  "floor": 1,
  "passengers": [],
  "status": "STOPPED"
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | integer | 해당 엘리베이터 번호 |
| `floor` | integer | 해당 엘리베이터의 현재 위치(층) |
| `passengers` | array of [`Call`](#call) | 해당 엘리베이터에 타고 있는 승객들을 표현하는 `Call`의 목록 |
| `status` | string | 해당 엘리베이터 상태 |

<a name="ticket"></a>
### Ticket
채점자가 처리해야 할 요청을 표현한다. 
엘리베이터 문제에서는 엘리베이터 이용자의 `Call`을 표현한다.

```json
{
  "id": 0,
  "timestamp": 0,
  "start": 1,
  "end": 2
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | integer | `Call`의 고유 번호 |
| `timestamp` | integer | 해당 `Call`이 발생한 `timestamp` |
| `start` | integer | 출발 층 |
| `end` | integer | 가려는 층 |

<a name="command"></a>
### Command
환경을 어떻게 조작할지 명령을 표현한다. 
엘리베이터 문제에서는 엘리베이터 제어 명령을 표현한다.

```json
{
  "elevator_id": 0,
  "command": "UP",
}
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| `elevator_id` | integer | 명령을 실행할 엘리베이터의 번호 ([`Elevator`](#elevator)의 `id`) |
| `command` | string | 실행할 명령 (`STOP`, `OPEN`, `CLOSE`, `UP`, `DOWN` 중 하나) |

