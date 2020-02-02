//     const sampleAsync = async function(msg) {
//     const meal = await school.getMeal()
//     const calendar = await school.getCalendar()
//     // 오늘 날짜
//     console.log(meal.today);

//     console.log(`${meal.month}월 ${meal.day}일`)
//     // 오늘 급식 정보
//     if(meal.today == ""){
//         msg.channel.send("오늘은 급식이 없습니다.");
//     }else{
//         msg.channel.send(meal.today);
//     }
    
//     // 이번 달 급식 정보
//     //console.log(meal)

//     // 이번 달 학사일정
//     //console.log(calendar)

//     // 년도와 달을 지정하여 해당 날짜의 데이터를 조회할 수 있습니다.
//     // const mealCustom = await school.getMeal(2018, 9)
//     // const calendarCustom = await school.getCalendar(2017, 4)   
//     // console.log(mealCustom)
//     // console.log(calendarCustom)
//     // // 년도값 대신 옵션 객체를 전달하여 데이터 수집 가능
//     // const optionMeal = await school.getMeal({
//     //   year: 2018,
//     //   month: 9,
//     //   default: '급식이 없습니다'
//     // })
//     // const optionCalendar = await school.getCalendar({
//     //   // year, month 생략시 현재 시점 기준으로 조회됨`
//     //   default: '일정 없는 날'
//     // })
//     // console.log(optionMeal)
//     // console.log(optionCalendar)
//   }