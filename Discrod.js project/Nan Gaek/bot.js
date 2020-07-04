const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');
const mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  database: config.dbname,
  user: "root",
  password: config.sqlpassword
})

let player_count;
let global_rows;

const select_information = async () =>{
  var sql = `SELECT * FROM user_information`
  await db.query(sql, async function(err, rows){
    if(!err) {
      global_rows = rows;
      player_count = rows.length;
      console.log("select_inforation");
    }else{
        console.log(err);
    }   
  })
}

client.on('message', async msg => { 

  if(msg.content.includes('!참가')){
    await select_information();
    player_count += 1;
    sql = `insert into user_information(name) VALUES("${msg.author.username}")`;
    await db.query(sql, function(err, rows){
        if(!err) {
            console.log("!참가 입력 성공");
            msg.reply(`"${msg.author.username}"으로 정상적으로 등록되었습니다. (8/${player_count})`)
        }else{
            console.log(err);
        }   
    })
  }

  if(msg.content.includes('!리스트')){
      await select_information();
      console.log(global_rows)
      console.log(player_count)
      let player_list = ''
      for (var i in player_count){
        player_list  += global_rows[i].name + '/n';
      }
      msg.reply(`''' ${player_list} '''`)
  }
})



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.Nan_Gaek_bot_token) 