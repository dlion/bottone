#!/bin/env node

//
//Modules
//

var exec = require('./exec');

//
// Connect to Server
//

var irc = exec.connect(function() {
    exec.init(irc);
});

irc.on('data',function(data) {
    data = data.toString().toLowerCase();

    exec.checkCMD(data,irc);
});

irc.on('error',function(err) {
    exec.errorLog(err);
});

irc.on('end', function() {
    exec.infoLog("Disconnected!");
});
