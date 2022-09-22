const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { join } = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

const clientPath = `${__dirname}/client`;
console.log(`Serving static files from path ${clientPath}`);

app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT);
console.log("Server listening at " + PORT);

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

function findindex(str) {
    var num = /\d/;
    var nums = str.match(num);
    return str.indexOf(nums);
}
function extractFloat(str) {
    const regex = /\d+((.|,)\d+)?/;
    const regex2 = (/[\d,]+\.\d+/)
    const isThisTheFloat = str.match(regex);
    const isThisTheFloat2 = str.match(regex2);
    
    if (!isThisTheFloat2 && !isThisTheFloat) {return;}
    

    if (isThisTheFloat[0].length > 8) {return;}
    
    if (!isThisTheFloat2) {return isThisTheFloat[0];}
    

    if (isThisTheFloat2[0] === "999.999" || isThisTheFloat2[0].length === 6) {
        return isThisTheFloat2[0];
    } else {
        return isThisTheFloat[0];
    }
}

io.sockets.on('connection', function (sock) {

    sock.on('newuser', (data) => {

        sock.id = data; //"TCR"
        const message = data + " connected";
        const getResult = null;
        const playerId = data;
        io.emit('chat-to-clients', { message, getResult, playerId });
        
        // sock.on('keyPress', function (data) {

        //     if (mindControlMode === false) {

        //         if (gridSystem[gridSysKey].steps <= 0) {return}

        //         gridSystem.movePlayer(data, gridSystem[gridSysKey]);

        //         //gridSystem.dimensionDoors(gridSystem[gridSysKey]);
                           
        //         gridSystem.depositCash(gridSystem[gridSysKey]);

        //         gridSystem.emitToUsers();


        //     } else if (mindControlMode === true && sock.id === "TCR") {

        //         const newGridSysKey = getPlayerObjectKey(mindControlledStudent);
        //         if (gridSystem[newGridSysKey].steps <= 0) {return}
        //         gridSystem.movePlayer(data, gridSystem[newGridSysKey]);

        //         gridSystem.emitToUsers();

        //     }
            

        // });

    });

    sock.on('disconnect', () => {
        io.emit('chat-to-clients', sock.id + " disconnected");
    });

    sock.on('chat-to-server', (data) => {
        // console.log(findindex(data));
        const message = data;
        const getResult = extractFloat(data);
        const playerId = message.slice(0, 4).replace(/[^A-Z]+/g, "");
        io.emit('chat-to-clients', { message, getResult, playerId });
    });
    
    sock.on('clearAllResults', () => {
        io.emit('clearAllResults');
    });

});