const School = require('node-school-kr');
const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();
const school = new School()
const today = new Date();
const todayyear = today.getFullYear();
const todaymonth = today.getMonth()+1;
const todayday = today.getDate();
let lee_secret = 0;
let attack_user = "지우";
let stauts = "명령어가 궁금 하시면 \"하이민준 명령어\" 를 입력해주세요!"
school.init(School.Type.HIGH, School.Region.GWANGJU, 'F100000120');//120

const mealAsync = async function(msg) {
    const meal = await school.getMeal()
    const calendar = await school.getCalendar()
    // 오늘 날짜
    console.log(meal.today);
    console.log(`${meal.month}월 ${meal.day}일`)
    // 오늘 급식 정보
    if(meal.today == ""){
        msg.channel.send("오늘은 급식이 없습니다.");
    }else{
        msg.channel.send("```" + meal.today + "```");
    }
  }

const calAsync = async function(msg) {
    const meal = await school.getMeal()
    const calendar = await school.getCalendar()
    const content = calendar[String(todayday)];
    // 오늘 일정 정보
    if(content == ""){
        msg.channel.send("오늘은 일정이 없습니다.");
    }else{
        msg.channel.send("```" +`${meal.month}월 ${meal.day}일 일정 \n--------------\n${content}` + "```");
    }
}

client.on('message', msg =>{ //급식  일정
    if(msg.content == 'gsm급식' || msg.content == 'GSM급식'){
        //console.log(school.getTargetURL('meal', 2018, 5))
        mealAsync(msg);
    }else if(msg.content == 'gsm일정' || msg.content == 'GSM일정'){ //일정
        //console.log(school.getTargetURL('calendar')) 
        calAsync(msg);
    }
});

client.on('message', msg =>{
    console.log(`author.username = ${msg.author.username}`)
    if((msg.author.username == attack_user) && (lee_secret == 1)){
        msg.channel.send(`${attack_user}아 넌 좀 조용히해`); 
    }else if(msg.content == '하이민준'){
        console.log(msg.author.username);
        msg.reply(`안냥!!`);
    }else if(msg.content == '하이의현 명령어'){
        msg.channel.send("```" + `하이민준 : 민준이가 상큼하게 인사합니다.\n\ngsm일정 : 오늘 하루의 gsm일정을 알려줍니다. \n\ngsm급식 : 오늘의 하루의 gsm급식을 알려줍니다.` + "```");
    }

    if(msg.content == '하이의현 공격' && (msg.author.username != attack_user)){
        if(lee_secret == 1){
            msg.channel.send(`이미 ${attack_user} 를 공격중입니다.`); 
        }else{
            lee_secret = 1;
            msg.channel.send(`이의현 공격 모드 시작  대상 : ${attack_user}`);     
        }
    }else if(msg.content == '하이의현 공격 종료' && (msg.author.username != attack_user)){
        if(lee_secret == 0){
            msg.channel.send("이미 종료 되었습니다."); 
        }else{
            lee_secret = 0;
            msg.channel.send("이의현 공격 모드 종료");     
        }
    }
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(function() {
    client.user.setPresence({game : {name : stauts}, status : 'online'});
    }, 10000)
  });
client.login(config.token)


/*
msg.author.avatarURL 상대방의 이미지 주소를 가져옴
msg.author 를 쓰면 언급을 하지만 뒤에 .username 을 붙이면 언급을 안함
msg.reply 상대방을 언급하며 대화를 날림
msg.channel.send 보통 대화₩
*/


