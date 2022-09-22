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

io.sockets.on('connection', function (sock) {

    sock.on('newuser', (data) => {

        sock.id = data; //"TCR"
        io.emit('chat-to-clients', data + " connected");
        
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
        io.emit('chat-to-clients', data);
    });
    

});