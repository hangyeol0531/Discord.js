const School = require('node-school-kr');
const Discord = require('discord.js');
const config = require('../config.json');
const client = new Discord.Client();
const school = new School()

const today = new Date();
const todaymonth = today.getMonth()+1;
const todayday = today.getDate();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '안냥') {
    msg.reply(`안녕하세여 ${msg.author.username} 님!!`);
  }
});

client.on('message', msg =>{
    if(msg.content === 'gsm급식' || msg.content === 'GSM급식'){
        school.init(School.Type.HIGH, School.Region.GWANGJU, 'F100000120');
        // console.log(school.getTargetURL('meal', 2018, 5))
        // console.log(school.getTargetURL('calendar'))
        msg.channel.send(`오늘의 날짜는 ${todaymonth}월 ${todayday}일 입니다!!!!`);
        sampleAsync();
    }
});

client.login(config.token)


 /*
 msg.author.avatarURL 상대방의 이미지 주소를 가져옴
 msg.author 를 쓰면 언급을 하지만 뒤에 .username 을 붙이면 언급을 안함
 msg.reply 상대방을 언급하며 대화를 날림
 msg.channel.send 보통 대화
 */

const sampleAsync = async function() {
    const meal = await school.getMeal()
    const calendar = await school.getCalendar()
    // 오늘 날짜
    console.log(`${meal.month}월 ${meal.day}일`)

    // 오늘 급식 정보
    console.log(meal.today)
    
    // 이번 달 급식 정보
    console.log(meal)

    // 이번 달 학사일정
    console.log(calendar)

    // 년도와 달을 지정하여 해당 날짜의 데이터를 조회할 수 있습니다.
    const mealCustom = await school.getMeal(2018, 9)
    const calendarCustom = await school.getCalendar(2017, 4)   
    console.log(mealCustom)
    console.log(calendarCustom)
    // 년도값 대신 옵션 객체를 전달하여 데이터 수집 가능
    const optionMeal = await school.getMeal({
      year: 2018,
      month: 9,
      default: '급식이 없습니다'
    })
    const optionCalendar = await school.getCalendar({
      // year, month 생략시 현재 시점 기준으로 조회됨
      default: '일정 없는 날'
    })
    console.log(optionMeal)
    console.log(optionCalendar)
  }