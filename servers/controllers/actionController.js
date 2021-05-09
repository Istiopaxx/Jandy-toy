

exports.exec_command = function(req, res, next) {
    const data = req.data;
    const gradingData = data.gradingData;
    const commands = req.body.commands;
    

    const open_elevator = function(gradingData, elevatorId, passengerLimit) {
        let states = gradingData.states;
        let elevator = states[elevatorId];
        let passengers = elevator.passengers;
        let tickets = gradingData.tickets;

        // UPWARD, DOWNWARD 상태에서 OPEN 명령 시 오류 발생
        if(elevator.status == "UPWARD" || elevator.status == "DOWNWARD") {
            throw new Error('Unvalid command');
        }


        // 도착지점이 현재층인 엘리베이터 탑승객이 내림
        let temp = [];
        for(let i = 0; i < passengers.length; i++) {
            if(passengers[i].end == elevator.floor) {
                continue;
            }
            else {
                temp.push(passengers[i]);
            }
        }

        // 현재 층에 있는 call이 탑승
        for(let i = 0; i < tickets.length; i++) {
            if(tickets[i].start == elevator.floor && temp.length <= passengerLimit) {
                temp.push(tickets[i]);
            }
        }

        // 엘리베이터 탑승객 목록, STATUS 업데이트
        gradingData.states[elevatorId].passengers = temp;
        gradingData.states[elevatorId].status = "OPENED";
    }

    const close_elevator = function(gradingData, elevatorId) {
        let states = gradingData.states;
        let elevator = states[elevatorId];

        // UPWARD, DOWNWARD, STOPPED 상태에서 CLOSE 명령 시 오류 발생
        if(elevator.status == "UPWARD" || elevator.status == "DOWNWARD" || elevator.status == "STOPPED") {
            throw new Error('Unvalid command');
        }
        
        // 엘리베이터 STATUS 업데이트
        gradingData.states[elevatorId].status = "STOPPED";
    }

    const stop_elevator = function(gradingData, elevatorId) {
        let states = gradingData.states;
        let elevator = states[elevatorId];

        // OPENED 상태에서 STOP 명령 시 오류 발생
        if(elevator.status == "OPENED") {
            throw new Error('Unvalid command');
        }

        // 엘리베이터 STATUS 업데이트
        gradingData.states[elevatorId].status = "STOPPED";
    }

    

    const up_elevator = function(gradingData, elevatorId, maxFloor) {
        let states = gradingData.states;
        let elevator = states[elevatorId];
        let floor = elevator.floor;

        // DOWNWARD, OPENED, 최고층 상태에서 UPWARD 명령 시 오류 발생
        if(elevator.status == "DOWNWARD" || elevator.status == "OPENED" || floor == maxFloor) {
            throw new Error('Unvalid command');
        }

        
        // 엘리베이터 STATUS, FLOOR 업데이트
        gradingData.states[elevatorId].status = "UPWARD";
        gradingData.states[elevatorId].floor = floor + 1;
    
    }

    const down_elevator = function(gradingData, elevatorId, minFloor) {
        let states = gradingData.states;
        let elevator = states[elevatorId];
        let floor = elevator.floor;

        // UPWARD, OPENED, 최저층 상태에서 DOWNWARD 명령 시 오류 발생
        if(elevator.status == "UPWARD" || elevator.status == "OPENED" || floor == minFloor) {
            throw new Error('Unvalid command');
        }

        // 엘리베이터 STATUS, FLOOR 업데이트
        gradingData.states[elevatorId].status = "DOWNWARD";
        gradingData.states[elevatorId].floor = floor - 1;

    }


    const exec_elevator_command = function(gradingData, commands) {
        
        if(!gradingData || !commands) {
            throw new Error('no state/commands');
        }

        // command가 엘레베이터 갯수보다 많은 경우 
        if(commands.length > 4) {
            throw new Error('too many commands');
        }

        for(var i = 0; i < commands.length; i++) {
            const elevatorId = commands[i].elevator_id;
            const command = commands[i].command;
            // passengerLimit, maxFloor, minFloor가 하드코딩되어있으니 수정
            switch (command) {
            case "OPEN" : 
                open_elevator(gradingData, elevatorId, 8);
                break;
            case "CLOSE" : 
                close_elevator(gradingData, elevatorId);
                break;
            case "STOP" : 
                stop_elevator(gradingData, elevatorId);
                break;
            case "UP" : 
                up_elevator(gradingData, elevatorId, 10);
                break;
            case "DOWN" : 
                down_elevator(gradingData, elevatorId, 1);
                break;
            }
        }
    }

    try {
        exec_elevator_command(gradingData, commands);
        req.data.gradingData = gradingData;
        next();
    }
    catch(err) {
        console.log('error: ' + err);
        res.status(400).send(err);
    }

}



exports.increase_timestamp = function(req, res, next) {
    let data = req.data;
    let gradingData = data.gradingData;
    let nowTimestamp = gradingData.timestamp;

    req.data.gradingData.timestamp = nowTimestamp + 1;
    next();
}


exports.append_tickets = function(req, res, next) {
    let data = req.data;
    const entire_tickets = data.entire_tickets;
    let gradingData = data.gradingData;
    let tickets = gradingData.tickets;
    let nowTimestamp = gradingData.timestamp;

    let temp = [];
    for(let i = 0; i < entire_tickets.length; i++) {
        const ticket = entire_tickets[i];
        if(ticket.timestamp == nowTimestamp) {
            tickets.push(ticket);
        }
        else {
            temp.push(ticket);
        }
    }

    req.data.gradingData.tickets = tickets;
    req.data.entire_tickets = temp;
    next();
    
}



exports.check_ifend = function(req, res, next) {
    const data = req.data;

    const check_elevator_ifend = function(data) {
        const entire_tickets = data.entire_tickets;
        const gradingData = data.gradingData;
        const states = gradingData.states;
        const tickets = gradingData.tickets;
        
        let ifEmptyEntireTickets = false;
        let ifEmptyStates = true;
        let ifEmptytickets = false;
        if(entire_tickets.length == 0) {
            ifEmptyEntireTickets = true;
        }
        for(let i = 0; i < states.length; i++) {
            if(states[i].passengers.length != 0) {
                ifEmptyStates = false;
            }
        }
        if(tickets.length == 0) {
            ifEmptytickets = true;
        }

        if(ifEmptyEntireTickets && ifEmptyStates && ifEmptytickets) {
            data.gradingData.isEnd = true;
        }
    }

    try {
        check_elevator_ifend(data);
        req.data = data;
        next();
    }
    catch(err) {
        console.log("Error: " + err);
        res.status(500).send(err);
    }

}








