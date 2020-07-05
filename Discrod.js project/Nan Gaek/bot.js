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
  if(msg.channel.name.includes('낸객') ){
    if(msg.content.includes('!참가')){
      var player_count;
      var sql = `SELECT * FROM user_information`
      await db.query(sql, async function(err, rows){
        if(!err) {
          player_count = rows.length + 1;
          console.log("검색 성공");
          if(player_count <= 8){
            sql = `SELECT * FROM user_information where discord_id = "${msg.author.id}"`
            await db.query(sql, async function(err, rows){
              if(!err) {
                if(!rows[0]){
                  sql = `insert into user_information(name, discord_id) VALUES("${msg.author.username}", "${msg.author.id}")`;
                  await db.query(sql, async function(err, rows){
                      if(!err) {
                          console.log("입력 성공");
                          msg.reply(`"${msg.author.username}"으로 정상적으로 등록되었습니다. (${player_count} / 8)`)
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
        }else{
          msg.reply(`사람이 가득 찼습니다!! (${player_count - 1}/8)`)
        }
        }else{
            console.log(err);
        }   
      })
    }

    if(msg.content.includes('!취소')){
      var sql = `SELECT * FROM user_information where discord_id = "${msg.author.id}"`
      await db.query(sql, async function(err, rows){
        if(!err){
          if(rows[0]){
            sql = `DELETE FROM user_information where discord_id = "${msg.author.id}"`
            await db.query(sql, async function(err, rows){
              if(!err){
                msg.reply('취소되었습니다.')
              }else{
                console.log(err)
              }
            })
          }else{
            msg.reply('이미 참여하지 않는 선수입니다.');
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
    
    if(msg.content.includes('!팀')){
      var player_count
      var sql = `SELECT * FROM user_information`
      var player_list = ''
      await db.query(sql, function(err, rows){
        if(!err) {
          player_count = rows.length
          console.log(`선수 검색 완료 : ${player_count}`)
          if(player_count == 8){
            let players = new Array(8);
            let team1 = new Array(4);
            let team2 = new Array(4);
            for(var i in rows){
              players[i] = rows[i].name;
            }
            var players_shuffle = players.sort(function(){return 0.5-Math.random()});
            console.log(players_shuffle)
            team1 = players[0] + " , " + players[1] + " , " + players[2] + " , " + players[3];
            team2 = players[4] + " , " + players[5] + " , " + players[6] + " , " + players[7];
            msg.channel.send("```" + '팀1: '  + team1 + "```" + '\n' + "```" + '팀2: '  + team2 + "```")
            
          }else{
            msg.channel.send('선수가 부족합니다.')
          }
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