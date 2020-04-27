const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let check_cotent;
    let check_array = [ ];
  if (msg.content.slice(0,3) === '검준식') {
    console.log("검준식 가동");
    msg.content = msg.content.toUpperCase();
    check_cotent = msg.content.slice(3, msg.content.length+1);
    console.log(check_cotent);
    
    if(check_cotent.includes('UM')){
        check_array.push('UM');
    }
    if(check_cotent.includes('JUN')){
        check_array.push('JUN');
    }
    if(check_cotent.includes('SIK')){
        check_array.push('SIK');
    }
    if(check_cotent.includes('엄')){
        check_array.push('엄');
    }
    if(check_cotent.includes('준')){
        check_array.push('준');
    }
    if(check_cotent.includes('식')){
        check_array.push('식');
    }
    console.log(check_array);
    if(check_array == ''){
        msg.reply("깨끗한 엄입니다.");
    }else{
        msg.reply(`${check_array}은 살아있다.`);
    }
  }
});

client.login(config.token)