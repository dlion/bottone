var config  =   require('./config'),
    net     =   require('net'),
    exec    =   exports;

//
// Debug Info
//

exec.infoLog = function(msg) {
  console.log("\nBottone_INFO: "+msg+"\n");
};

//
// Debug Error
//

exec.errorLog = function(msg) {
  console.log("\nBottone_ERROR: "+msg+"\n");
};

//
// Connect to server
//

exec.connect =  function(cb) {
  return net.connect(config.PORT, config.SERVER,cb);
};

//
// Send messages to server
//

exec.msgServer = function(msg,irc) {
  irc.write(msg+"\r\n");
};

//
// Send messages to a specific channel
//

exec.msgChannel = function(msg,channel,irc) {
  irc.write("PRIVMSG "+channel+" :"+msg+"\r\n");
};

//
// Welcome Message
//

exec.welcomeMsg = function(irc) {
  exec.msgChannel("Hi at All!",config.CHAN,irc);
  exec.msgChannel("My name is "+config.REALNAME+" and I am a BOT :)",config.CHAN,irc);
  exec.msgChannel("You can see my CMD list send me !<command>",config.CHAN,irc);
};

//
// Init
//

exec.init = function(irc) {
  exec.infoLog("Connected to "+config.SERVER+":"+config.PORT);
  exec.msgServer("NICK "+config.NICK,irc);
  exec.msgServer("USER "+config.IDENTITY+" "+config.HOSTNAME+" * :"+config.REALNAME,irc);
  exec.msgServer("JOIN "+config.CHAN,irc);
  exec.infoLog("Joined into: "+config.CHAN);
  exec.welcomeMsg(irc);
};

//
// Check Commands
//

exec.checkCMD = function(cmd,irc) {
  console.log("RICV: "+cmd);

  if(cmd.indexOf("ping") > -1) {
    exec.infoLog("Ponging");
    exec.msgServer("PONG "+config.CHAN,irc);
  }
  else if(cmd.indexOf("pong") > -1) {
      exec.infoLog("Pinging");
      exec.msgServer("PING "+config.CHAN,irc);
  }
  else if(cmd.indexOf("privmsg") > -1) {
      var comando = cmd.split(':')[2].toLowerCase();
      switch(comando) {
          case "ciao\r\n":
              exec.infoLog("BIINGOO:"+comando);
              exec.msgChannel("Author: Domenico Leone Luciani",config.CHAN,irc);
              exec.msgChannel("Site: http://dlion.it",config.CHAN,irc);
              exec.msgChannel("GitHub: http://github.com/DLion",config.CHAN,irc);
              exec.msgChannel("EVVIVAA: "+comando,config.CHAN,irc);
          break;
      }
  }
};
