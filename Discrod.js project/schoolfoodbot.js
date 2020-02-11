const School = require('node-school-kr');
const Discord = require('discord.js');
const config = require('../config.json');

const client = new Discord.Client();
const school = new School()
const today = new Date();

var url = require('url');
var parsedObject = url.parse('https://tracker.delivery/#/kr.logen/1111111111111');
const axios = require('axios').default;


const todayyear = today.getFullYear();
const todaymonth = today.getMonth()+1;
const todayday = today.getDate();
var fs = require('fs');

let posthelp = fs.readFileSync('gsmposthelp.txt', 'utf-8');
let help = fs.readFileSync('schoolbot_help.txt', 'utf-8');
let stauts = fs.readFileSync('schoolbot_state.txt', 'utf-8');
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

const getpost_information = async function(post_number){
  try {
    return await axios.get(`https://apis.tracker.delivery/carriers/kr.hanjin/tracks/${post_number}`);
  } catch (error) {
    console.error(error);
  }
};


client.on('message', async msg =>{
    msg.content = msg.content.replace(/(\s*)/g, "");
   if(msg.content == '하이gsm'){
        console.log(msg.author.username);
        await msg.reply(`안냥!!`);
    }
    
    if(msg.content == '하이gsm명령어'){
        await msg.channel.send(help);
    }
    /////////////////////////////////

    if(msg.content == 'gsm급식' || msg.content == 'GSM급식'){
        //console.log(school.getTargetURL('meal', 2018, 5))
        await mealAsync(msg);
    }
    
    if(msg.content == 'gsm일정' || msg.content == 'GSM일정'){ //일정
        //console.log(school.getTargetURL('calendar')) 
        await calAsync(msg);
    }

    if(msg.content.slice(0, 5) == 'gsm택배'){
        let post_number = msg.content.slice(5, 20);
        if(!isNaN(post_number)){
            try{
                const post_information = await getpost_information(post_number);
                console.log(post_information.data.progresses.length);
                console.log(post_information.data.progresses[post_information.data.progresses.length - 1].description);
                let customer_description = post_information.data.progresses[post_information.data.progresses.length - 1].description;
                let customer_location = post_information.data.progresses[post_information.data.progresses.length - 1].location.name;
                msg.reply(`현재 장소는 ${customer_location} 에서 ${customer_description}`);

            }catch(error){
                console.log(error)
                msg.reply("운송장 번호 확인부탁 ><");
            }
        }else{
            msg.reply("숫자모르심? 숫자만쓰셈^^");
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
msg.channel.send 보통 대화
*/


