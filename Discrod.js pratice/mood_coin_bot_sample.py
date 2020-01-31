import asyncio
import discord
import requests
import json


url = "http://10.120.72.127:8080/"
client = discord.Client()
name = "한결"
# 생성된 토큰을 입력해준다.
token = "NjU3MDI1MDY4OTI0MjcyNjUx.XglJVA.jjmNeQyFfl1tp5kqt1Jk5eU7sUM"

# 봇이 구동되었을 때 보여지는 코드
@client.event
async def on_ready():
    print("다음으로 로그인합니다")
    print(client.user.name)
    print(client.user.id)
    print("================")

# 봇이 특정 메세지를 받고 인식하는 코드
@client.event
async def on_message(message):
    userid = message.author.id
    username = message.author.name
    channel = message.channel
    # 메세지를 보낸 사람이 봇일 경우 무시한다
    if message.author.bot:
        return None
    
    if message.content:
        #await channel.send(message.content)
        data = {'id' : userid,
                'name': username,
                'talk': message.content
                }       
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        #await channel.send(data)
        r = requests.post(url, data=json.dumps(data), headers=headers)
        #await channel.send(r)
        
            
client.run(token)