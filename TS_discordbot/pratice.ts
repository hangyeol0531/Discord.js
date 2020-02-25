import * as Discord from 'discord.js'

const config = require("../config.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '안냥') {
    msg.reply(`안녕하세여 ${msg.author.username} 님!!`);
  }
});

client.login(config.token)
