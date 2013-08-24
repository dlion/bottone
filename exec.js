var config  =   require('./config'),
    net     =   require('net'),
    exec    =   exports;

//
// Functions to manage Bottone
//

exec.infoLog = function(msg) {
    console.log("\nBottone_INFO: "+msg+"\n");
};

exec.errorLog = function(msg) {
    console.log("1nBottone_ERROR: "+msg+"\n");
};

exports.connect =  function(cb) {
    return net.connect(config.PORT, config.SERVER,cb);
};

exec.msgServer = function(msg,irc) {
    irc.write(msg+"\r\n");
};

exec.msgChannel = function(msg,channel,irc) {
    irc.write("PRIVMSG "+channel+" :"+msg+"\r\n");
};

exports.welcomeMsg = function(irc) {
    exec.msgChannel("Hi at All!",config.CHAN,irc);
    exec.msgChannel("My name is "+config.REALNAME+" and I am a BOT :)",config.CHAN,irc);
    exec.msgChannel("You can see my CMD list send me !<command>",config.CHAN,irc);
};

exports.init = function(irc) {
    exec.infoLog("Connected to "+config.SERVER+":"+config.PORT);
    exec.msgServer("NICK "+config.NICK,irc);
    exec.msgServer("USER "+config.IDENTITY+" "+config.HOSTNAME+" * :"+config.REALNAME,irc);
    exec.msgServer("JOIN "+config.CHAN,irc);
    exec.infoLog("Joined into: "+config.CHAN);
    exec.welcomeMsg(irc);
};

exports.checkCMD = function(cmd,irc) {
    
    if(cmd.indexOf("PING")) {
        exec.infoLog("Ponging");
        exec.msgServer("PONG",irc);
    }
    else if(cmd.indexOf("PONG")) {
        exec.infoLog("Pinging");
        exec.msgServer("PING",irc);
    }
};
