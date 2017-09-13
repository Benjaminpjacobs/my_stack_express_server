var io = require('socket.io-client');
var io_server = require('socket.io').listen(3001);
var assert = require('assert');

describe('basic socket.io example', function() {

    var socket;

    beforeEach(function(done) {
        // Setup
        socket = io.connect('http://localhost:3001', {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true,
            transports: ['websocket']
        });

        socket.on('connect', () => {
            done();
        });

        socket.on('disconnect', () => {
            console.log('disconnected...');
        });
    });

    afterEach((done) => {
        if (socket.connected) {
            socket.disconnect();
        }
        io_server.close();
        done();
    });

    it('should communicate', (done) => {
        // once connected, emit Hello World
        io_server.emit('msg', 'Hello World');

        socket.once('msg', (message) => {
            // Check that the message matches
            assert.equal(message, 'Hello World');
            done();
        });

        io_server.on('connection', (socket) => {
            assert(socket);
        });
    });

});