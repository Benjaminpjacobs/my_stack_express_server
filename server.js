const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const environment = process.env.NODE_ENV || 'development'

app.set('port', process.env.PORT || 8080)
app.use(cors())

const io = require('socket.io').listen(app.listen(app.get('port')));

app.post('/messages', function(request, response, next) {
    // io.sockets.emit("msg", request.body.msg);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end();
})

console.log(`Server Running At:localhost: ${app.get('port')}`);

io.sockets.on("connection", function(socket) {
    socket.emit("Waiting for message...");
    socket.on("Send_msg", function(data) {
        io.sockets.emit("msg", data);
    })
})