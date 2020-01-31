const School = require('node-school-kr');
const Discord = require('discord.js');
const config = require('../config.json');
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


 /*
 msg.author.avatarURL 상대방의 이미지 주소를 가져옴
 msg.author 를 쓰면 언급을 하지만 뒤에 .username 을 붙이면 언급을 안함
 msg.reply 상대방을 언급하며 대화를 날림
 msg.channel.send 보통 대화
 */