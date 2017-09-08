const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const port = process.env.PORT || 8080
const bodyParser = require('body-parser')
const pry = require('pryjs')

const app = express()

const server = http.createServer(app)
    .listen(port, () => {
        console.log('Listening on port ' + port + '.')
    })

const io = socketIo(server)

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/messages', function(request, response, next) {
    io.sockets.emit("msg", request.body);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end();
})

io.sockets.on("connection", function(socket) {
    socket.emit("Waiting for message...");
    socket.on("Send_msg", function(data) {
        io.sockets.emit("msg", data);
    })
})