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
    data = data.toString();

    exec.checkCMD(data,irc);
});

irc.on('end', function() {
    exec.infoLog("Disconnected!");
});
