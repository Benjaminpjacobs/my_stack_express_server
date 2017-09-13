var assert = require('assert');
var request = require('request');
var app = require('../server');
var io = require('socket.io-client');
var io_server = require('socket.io')

describe('Server', function() {

    before(function(done) {
        this.port = 9876;
        this.server = app.listen(this.port, function(err, result) {
            if (err) { return done(err); }
            done();
        });
        this.request = request.defaults({
            baseUrl: 'http://localhost:9876'
        });
        this.socket = io.connect('http://localhost:9876', {
            'force new connection': true,
        });
    });

    after(function() {
        this.server.close();
        this.socket.close();
    });

    it('should exist', function() {
        assert(app);
    });

    it('should return a 200 on messages endpoint', function() {
        this.request.post('/messages?id=1', (error, response) => {
            if (error) { done(error); }
            this.socket.on('msg', message => {
                return console.log(message);
            })

        })
    })
});