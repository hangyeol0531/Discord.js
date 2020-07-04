const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');
const mysql = require('mysql');
const { isUndefined } = require('util');

var db = mysql.createConnection({
  host: "localhost",
  database: config.dbname,
  user: "root",
  password: config.sqlpassword
})


client.on('message', async msg => {
  if(msg.channel.name.includes('낸객')){
    if(msg.content.includes('!참가')){
      var player_count;
      var sql = `SELECT * FROM user_information`
      await db.query(sql, function(err, rows){
        if(!err) {
          player_count = rows.length + 1;
          console.log("검색 성공");
        }else{
            console.log(err);
        }   
      })
      sql = `SELECT * FROM user_information where discord_id = "${msg.author.id}"`
        await db.query(sql, async function(err, rows){
          if(!err) {
            if(!rows[0]){
              sql = `insert into user_information(name, discord_id) VALUES("${msg.author.username}", "${msg.author.id}")`;
              await db.query(sql, async function(err, rows){
                  if(!err) {
                      console.log("입력 성공");
                      msg.reply(`"${msg.author.username}"으로 정상적으로 등록되었습니다. (8/${player_count})`)
                  }else{
                      console.log(err);
                  }   
              })
            }else{
              msg.reply('이미 등록되어 있는 선수입니다.')
            }
          }else{
              console.log(err);
          }   
      })
    }
  
    if(msg.content.includes('!리스트')){
     
      var sql = `SELECT * FROM user_information`
      var player_list = ''
      db.query(sql, function(err, rows){
        if(!err) {
          for(var i in rows){
            player_list  += Number(i) +1 + '.' +rows[i].name + '\n';
            console.log(rows[i].name)
          }
          msg.reply("```" + player_list + "```" )
        }else{
            console.log(err);
        }   
      })
    }
  
    if(msg.content.includes('!초기화')){
      var sql = `DELETE FROM user_information`
      db.query(sql, function(err, rows){
        if(!err) {
          msg.reply("초기화되었습니다.")
        }else{
            console.log(err);
        }   
      })
    }
  }
})



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.Nan_Gaek_bot_token) 