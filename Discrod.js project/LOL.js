const School = require('node-school-kr');
const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
client.login(config.token)