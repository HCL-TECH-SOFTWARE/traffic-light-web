/*******************************************************************************
 * (c) Copyright HCL Technologies Ltd. 2018.  MIT Licensed!
 *******************************************************************************/

/**
 * Server application entry point
 * @author Mattias Mohlin
 */
'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 4000;
const env = process.env.NODE_ENV || 'development';

// Static middleware for serving static files 
app.get('/', function(req, res) {
    res.contentType("text/html");
    res.sendFile(__dirname + '/public/html/main.html');
});
app.get('/css', function(req, res) {
    res.contentType("text/css");
    res.sendFile(__dirname + '/public/css/styling.css');
});
app.get('/images/stop', function(req, res) {
    res.contentType("img/png");
    res.sendFile(__dirname + '/public/images/stop.png');
});
app.get('/images/walk', function(req, res) {
    res.contentType("img/png");
    res.sendFile(__dirname + '/public/images/walk.png');
});
app.get('/main', function(req, res) {
    res.contentType("text/javascript");
    res.sendFile(__dirname + '/public/js/main.js');
});
app.get('/jquery', function(req, res) {
    res.contentType("text/javascript");
    res.sendFile(__dirname + '/public/js/jquery/jquery.min.js');
});

var rtAppCallback = null;

// Messages from web application to RT application 
app.get('/ped_button', function(req, res) {
    if (!rtAppCallback) {
        console.log('RT application not running!');
        return;
    }

    rtAppCallback('ped_button');    
    res.end();
});

// Attempts to fetch a message to the RT application
app.get('/command', function(req, res) {
    console.log('Ready for command');
    rtAppCallback = function (cmd) {
        res.send(cmd);
    };
    // Let this request be pending until there is any command to send back
});

// Messages from RT application
app.get('/trafficlight', function(req, res) {
    let light = req.query.light;
    //console.log("Light: " + light);

    // Send light info to all connected web clients
    io.emit('light', {'light' : light});

    res.contentType("text/plain");
    res.send('OK');
});
app.get('/pedlight', function(req, res) {
    let light = req.query.light;
    console.log("Ped light: " + light);

    // Send light info to all connected web clients
    io.emit('pedlight', {'light' : light});

    res.contentType("text/plain");
    res.send('OK');
});

http.listen(port, () => console.log(`Web app listening on port ${port}!`));
