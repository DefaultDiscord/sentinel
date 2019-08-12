//constants

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const token = process.env.token;

//startup event handlers

client.on('ready', function() {
    console.log('Status loaded..');
    client.user.setPresence({ game: { name: `everyone`, type: `Watching` } });
});

client.on("ready", () => {
  console.log("Sentinal loaded...");
});

client.on('disconnected', function() {
    console.log('[META][WARN] Sentinel disconnected from Discord API Service. reconnecting...');
});

client.on('warn', function(msg) {
    console.log('[META][WARN] ' + msg);
});

client.on('error', function(err) {
    console.log('[META][ERROR] ' + err.message);
    process.exit(1);
});

client.on('messageDelete', message => {
  console.log(`message "${message.cleanContent}" was deleted from channel: ${message.channel.name} at ${new Date()}`);
  client.channels.get("610326108830826528").send(`message "${message.cleanContent}" has been deleted at ${new Date()}`)
});

client.on("message", (message) => {
  // check for bot author/prefix


  //text commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "test")) {
    message.channel.send("I'm still alive bitch");
  } else
  if (message.content.startsWith(config.prefix + "avatar")) {
    message.reply(message.author.avatarURL);
  } else
  if (message.content.startsWith(config.prefix + "Is SOM gay?")) {
    message.channel.send("Yeah he's a massive goy");
  } else
  if (message.content.startsWith(config.prefix + "Is Iiro gay?")) {
    message.channel.send("Yeah he's a massive goy");
  } else
  if (message.content.startsWith(config.prefix + "Is Roku gay?")) {
    message.channel.send("Obviously");
  } else
  if (message.content.startsWith(config.prefix + "Is Nick gay?")) {
    message.channel.send("Simply the gayest");
  } else
  if (message.content.startsWith(config.prefix + 'owner') && message.author.id === config.ownerID){
    message.channel.send("Default#9672");
  } else
  if (message.content.startsWith(config.prefix + 'endgamespoilers')) {
    message.channel.send("He's here. . .", {
      file: "https://i.imgur.com/lyCfMno.gif"
        });
    }

});

client.login(token);
