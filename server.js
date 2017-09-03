const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 8080;
const io = require('socket.io').listen(app.listen(port));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors())

app.post('/messages', function(request, response) {
    io.sockets.emit("msg", request.body.msg);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end();
})

console.log("Server Running At:localhost:" + port);

io.sockets.on("connection", function(socket) {
    socket.emit("Waiting for message...");
    socket.on("Send_msg", function(data) {
        io.sockets.emit("msg", data);
    })
})