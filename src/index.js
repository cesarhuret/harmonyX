const Discord = require('discord.js')
const { RichEmbed, Intents  } = require("discord.js")
const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online", 
    });
});

client.on('message', async msg => {

});

client.login('ODI1NDcwMDQ4OTI3ODc1MTU0.YF-Y5A.iXGKGVlKw3GgZPCJ5wh_HZXCtcg');


const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);