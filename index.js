const Discord = require("discord.js");
const { CommandoClient } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const mance = require("./database/mance.json");
const client = new Discord.Client();
const infraction = require("./database/infraction.json");
client.muted = require("./database/muted.json");
const config = require("./config/config.json");
const fs = require('fs');
const stopwatcharray = [];
const helpmodembed = new Discord.MessageEmbed()
  .setColor('#E3A624')
  .setTitle('서버 관리 도움말(마법지팡이)')
  .setURL('http://invite.magicjipange.kro.kr')
  .setAuthor('마법지팡이', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg', 'http://invite.magicjipange.kro.kr')
  .setDescription('마법지팡이 봇의 도움말을 보여줍니다.')
  .setThumbnail('https://i.ibb.co/mG6TX82/unnamed-1.jpg')
  .addFields(
    {
      name: "=벤 @멘션",
      value: "멘션된 유저를 벤처리합니다."
    },
    {
      name: "=청소 숫자",
      value: "숫자만큼의 메세지 갯수를 청소합니다."
    },
    {
      name: "=킥 @멘션",
      value: "멘션된 유저를 일시적으로 킥합니다."
    },
    {
      name: "=경고 @멘션",
      value: "멘션된 유저를 경고합니다. 경고가 5회 누적시 벤 처리됩니다."
    },
    {
      name: "=뮤트 @멘션",
      value: "멘션된 유저를 뮤트처리합니다."
    },
    {
      name: "=언뮤트 @멘션",
      value: "멘션된 유저를 언뮤트합니다."
    }
  )
.setTimestamp()
.setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
const nopermembed = new Discord.MessageEmbed()
  .setColor('#B8492E')
  .setTitle(":x: 이 명령어를 실행할 권한이 없습니다! :x:")
  .setTimestamp()
  .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
const helpembed = new Discord.MessageEmbed()
  .setColor('#E3A624')
  .setTitle('도움말(마법지팡이)')
  .setURL('http://invite.magicjipange.kro.kr')
  .setAuthor('마법지팡이', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg', 'http://invite.magicjipange.kro.kr')
  .setDescription('마법지팡이 봇의 도움말을 보여줍니다.')
  .setThumbnail('https://i.ibb.co/mG6TX82/unnamed-1.jpg')
  .addFields(
    {
      name: "=도움말",
      value: "지금과 같은 도움말을 보여줍니다."
    },
    {
      name: "=투표 {투표제목}",
      value: "Reaction에 있는 이모지를 통하여 투표를 진행합니다."
    },
    {
      name: "=강화 {이름}",
      value: "{이름}에 들어가있는 아이템을 강화합니다."
    },
    {
      name: "=실검",
      value: "현재 네이버의 실시간 검색어를 표시합니다."
    },
    {
      name: "=봇정보",
      value: "봇의 정보를 알려드립니다."
    },
    {
      name: "=서버정보",
      value: "서버의 정보를 알려드립니다."
    },
    {
      name: "=임베드 | 제목 | 내용 | HEX 색깔코드 | 채널",
      value: "제목과 내용이 담겨있는 임베드 메세지를 특정한 채널로 전송합니다."
    },
    {
      name: "=공부 시작/종료",
      value: "공부를 시작한 시점부터 종료한 시점까지의 시간을 표시합니다."
    },
    {
      name: "=도움말 관리",
      value: "서버를 관리할때 필요한 도움말들을 알려드립니다."
    }
  )
  .setTimestamp()
  .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');

client.on("ready", () => {
  console.log(`${client.guilds.cache.size}개의 서버에서 봇이 사용중!`);
  client.user.setActivity(`도움말: =도움말 | ${client.guilds.cache.size}개의 서버에서 운영중!`);
});
client.on("guildCreate", (guild) => {
    console.log(`새로운 길드에서 봇을 추가: ${guild.name}`);
    client.user.setActivity(`도움말: =도움말 | ${client.guilds.cache.size}개의 서버에서 운영중!`);
});
client.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
client.on("message", async message =>{
  const args = message.content.slice(config.prefix.length).split();
  const prefix = message.content.substring(0, 1);
  const command = args.shift().toLowerCase();
  const com = command;
  if(!message.guild)
    return;
  if(prefix === "=")
  {
    if(command === "도움말 관리")
    {
      message.channel.send(helpmodembed);
    }
    if(command === "도움말")
    {
      message.channel.send(helpembed);
    }
    if(command === "stop")
    {
      var voiceChannel = message.member.voice.channel;
      if(!voiceChannel)
      {
        message.channel.send(":x: 먼저 음성채널에 참여해주십시오! :x:");
      }
      else
      {
        let stopembed = new Discord.MessageEmbed()
          .setColor('#E3A624')
          .setTitle(':red_circle: 음악 재생 중지! :red_circle: ')
          .setDescription("현재 재생중인 노래를 중단합니다.")
          .setTimestamp()
          .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
        message.channel.send(stopembed);
        voiceChannel.leave('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
      }
    }
    if(command.startsWith("p") && !command.startsWith("play"))
    {
      var youtube = message.content.substring(3);
      var voiceChannel = message.member.voice.channel;
      if(!voiceChannel)
        message.channel.send(":x: 먼저 음성채널에 참가해주십시오! :x:");
      else
      {
        if(youtube.startsWith("https://www.youtube.com/") || youtube.startsWith("https://youtu.be/"))
        {
          voiceChannel.join().then(connection => {
            const dispatcher = connection.play(ytdl(youtube, {filter: 'audionly'}));
            dispatcher.on('end', ()=> voiceChannel.leave());
          }); //voiceChannel connection & play yt
          let youtubeembed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('현재 재생중: ' + youtube)
            .setTimestamp()
            .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
          message.channel.send(youtubeembed);
        }
        else
        {
          message.channel.send(":x: 유튜브 url을 보내주세요! :x:");
        }
      }
    }
    if(command.startsWith("play"))
    {
      var youtube = messsage.content.substring(6);
      var voiceChannel = message.member.voice.channel;
      if(!voiceChannel)
      {
        message.channel.send(":x: 먼저 음성채널에 참여해주세요! :x:");
      }
      else
      {
        if(youtube.startsWith("https://www.youtube.com/") || youtube.startsWith("https://youtu.be/"))
        {
          voiceChannel.join().then(connection => {
            const dispatcher = connection.play(ytdl(youtube, {filter: 'audionly'}));
            dispatcher.on('end', ()=> voiceChannel.leave());
          }); //voiceChannel connection & play yt
          let youtubeembed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('현재 재생중: ' + youtube)
            .setTimestamp()
            .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
          message.channel.send(youtubeembed);
        }
        else
        {
          message.channel.send(":x: 유튜브 url을 입력해주세요! :x:");
        }
      }
    }
    if(command === "서버정보")
    {
      let serverinfoembed = new Discord.MessageEmbed()
      .setColor('#E3A624')
      .setTitle(`${message.guild.name} 서버 정보`)
      .setURL('http://invite.magicjipange.kro.kr')
      .setAuthor('마법지팡이', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg', 'http://invite.magicjipange.kro.kr')
      .setDescription(`${message.guild.name}의 서버 정보를 알려줍니다.`)
      .setThumbnail('https://i.ibb.co/mG6TX82/unnamed-1.jpg')
      .addFields(
        {
          name: "서버 이름: ",
          value: `${message.guild.name}`
        },
        {
          name: "서버가 만들어진 시각: ",
          value: `${message.guild.createdAt}`
        },
        {
          name: "내가 서버에 입장한 시각: ",
          value: `${message.member.joinedAt}`
        },
        {
          name: "총 서버 멤버: ",
          value: `${message.guild.memberCount}`
        }
      )
      .setTimestamp()
      .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
      message.channel.send(serverinfoembed);
    }
    if(command === "봇정보")
    {
      let serverinfoembed = new Discord.MessageEmbed()
      .setColor('#E3A624')
      .setTitle(`마법지팡이 봇 정보`)
      .setURL('http://invite.magicjipange.kro.kr')
      .setAuthor('마법지팡이', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg', 'http://invite.magicjipange.kro.kr')
      .setDescription('마법지팡이 봇의 정보를 보여줍니다.')
      .setThumbnail('https://i.ibb.co/mG6TX82/unnamed-1.jpg')
      .addFields(
        {
          name: "봇 이름: ",
          value: "마법지팡이"
        },
        {
          name: "봇 초대 URL: ",
          value: "invite.magicjipange.kro.kr"
        },
        {
          name: "봇 공식 디스코드: ",
          value: "discord.magicjipange.kro.kr"
        },
        {
          name: "봇이 사용된 서버 갯수: ",
          value: `${client.guilds.cache.size}`
        }
      )
      .setTimestamp()
      .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
      message.channel.send(serverinfoembed);
    }
    if(command.startsWith("벤"))
    {
      if(message.member.hasPermission('BAN_MEMBERS'))
      {
        var member = message.mentions.members.first();
        let banembed = new Discord.MessageEmbed()
          .setColor('#B8492E')
          .setTitle(`${member.displayName}님이 벤을 당하셨습니다!`)
          .setTimestamp()
          .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
        member.ban().then((member)=>{message.channel.send(banembed);}).catch(()=>message.channel.send(nopermembed));
      }
      else
      {
        message.channel.send(nopermembed);
      }
    }
    if(command.startsWith("킥"))
    {
      if(message.member.hasPermission('KICK_MEMBERS'))
      {
      var member = message.mentions.members.first();
      let kickembed = new Discord.MessageEmbed()
        .setColor('#B8492E')
        .setTitle(`${member.displayName}님이 킥을 당하셨습니다!`)
        .setTimestamp()
        .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
      member.kick().then((member)=>{message.channel.send(kickembed);}).catch(()=>message.channel.send(nopermembed));
      }
      else
      {
        message.channel.send(nopermembed);
      }
    }
    if(command.startsWith("청소"))
    {
      try
      {
        if(message.member.hasPermission('MANAGE_MESSAGES'))
        {
          var argument = com.split(/\s+/);
          var clean = parseInt(argument[1]);
          if(clean === "NaN")
          {
            let notnumber = new Discord.MessageEmbed()
              .setColor('#B8492E')
              .setTitle('숫자를 입력해주시기 바랍니다!')
              .setTimestamp()
              .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
            message.channel.send(notnumber);
          }
          else
          {
            if(clean > 100 || clean < 3)
            {
              let impossible = new Discord.MessageEmbed()
                .setColor('#B8492E')
                .setTitle('숫자는 3 ~ 100 사이의 숫자만 입력하실 수 있습니다!')
                .setTimestamp()
                .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
              message.channel.send(impossible);
            }
            else
            {
              await message.channel.messages.fetch({ limit: clean }).then(messages => {message.channel.bulkDelete(messages)});
              let cleancompletembed = new Discord.MessageEmbed()
                .setColor('#E3A624')
                .setTitle(argument[1] + '**개 메세지의 청소가 완료되었습니다!**')
                .setTimestamp()
                .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
              message.channel.send(cleancompletembed);
            }
          }
        }
        else
        {
          message.channel.send(nopermembed)
        }
      }
      catch(e)
      {
        message.channel.send(":x: 디스코드 API로 인하여 14일 이상된 메세지는 삭제할 수 없습니다. :x:");
      }

    }
    if(command.startsWith("투표"))
    {
      let toopyo = new Discord.MessageEmbed()
        .setColor('#5beb34')
        .setTitle('**투표봇 추가**')
        .setDescription("투표봇은 투표 전용봇인 투표봇을 초대해서 쓰시면 더욱 쾌적하게 사용 가능합니다.\n제목을 누르시면 추가가능합니다.")
        .setURL("https://discordapp.com/oauth2/authorize?client_id=706010304773095484&permissions=8&scope=bot")
        .setTimestamp()
        .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
      message.channel.send(toopyo);
    }
    if(command.startsWith("뮤트"))
    {
      var role = message.guild.roles.cache.find(role => role.name === "Muted");
      if(message.member.hasPermission('KICK_MEMBERS') && message.member.hasPermission('BAN_MEMBERS'))
      {
        var toMute = message.mentions.members.first();
        if(!toMute)
        {
          message.channel.send(":x: 뮤트할 사람을 멘션해주세요! :x:");
        }
        else if(toMute.id === message.author.id)
        {
          message.channel.send(":x: 자기자신을 뮤트할 수는 없습니다! :x:");
        }
        else
        {
          try
          {
            if(!toMute.roles.cache.get(role.id))
            {
              message.guild.channels.cache.forEach((channel, id) => {
                channel.overwritePermissions([
                  {
                    id: role.id,
                    deny: ['SEND_MESSAGES','SEND_TTS_MESSAGES']
                  }
                ], 'muted');
              });
              toMute.roles.add(role.id);
              let muteembed = new Discord.MessageEmbed()
              .setTitle("<@" + toMute +">" + "**님을 성공적으로 뮤트했습니다!**")
              .setColor('#5beb34')
              .setTimestamp()
              .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
            message.channel.send(muteembed);
            }
            else
            {
              let alreadyembed = new Discord.MessageEmbed()
              .setTitle("이미 뮤트되었습니다!")
              .setColor('#B8492E')
              .setTimestamp()
              .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
            message.channel.send(alreadyembed);
            }
          }
          catch(e)
          {
            message.channel.send(":x: 뮤트를 진행하는 동안 에러가 발생하였습니다! :x:");
          }
        }
      }
      else
      {
        message.channel.send(nopermembed);
      }
    }
    if(command.startsWith("언뮤트"))
    {
      var role = message.guild.roles.cache.find(role => role.name === "Muted");
      var toUnMute = message.mentions.members.first();
      if(!toUnMute)
      {
        message.channel.send(":x: 언뮤트할 사람을 멘션해주세요! :x:");
      }
      else if(toUnMute.id === message.author.id)
      {
        message.channel.send(":x: 자기자신을 언뮤트할 수는 없습니다! :x:");
      }
      else
      {
        if(toUnMute.roles.cache.get(role.id))
        {
          toUnMute.roles.remove(role.id);
          let unmuteembed = new Discord.MessageEmbed()
          .setTitle(`<@${toMute}>**님을 성공적으로 언뮤트했습니다!**`)
          .setColor('#5beb34')
          .setTimestamp()
          .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
          message.channel.send(unmuteembed);
        }
        else
        {
          let alreadyembed = new Discord.MessageEmbed()
          .setTitle("이미 언뮤트되어 있거나 뮤트가 되어있지 않습니다!")
          .setColor('#B8492E')
          .setTimestamp()
          .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
        message.channel.send(alreadyembed);
        }
      }
    }
    if(command === "윙가르디온 레비오우사")
    {
      message.channel.send(":bird: 난다 날아! :bird:");
    }
    if(command === "초대")
    {
      message.channel.send("http://invite.magicjipange.kro.kr");
    }
    if(command.startsWith("경고"))
    {
      var moment = require('moment');
      var d = new Date();
      var currentDate = d.getFullYear() + "년 " + ( d.getMonth() + 1 ) + "월 " + d.getDate() + "일";
      var soik = moment().format('YYYY-MM-DD-HH-mm');
      var member = message.mentions.members.first();
      if(!message.member.hasPermission('BAN_MEMBERS'))
      {
        message.channel.send(nopermembed);
      }
      else if(member === "null")
      {
        message.channel.send(":no_entry_sign: 경고할 사람을 멘션해주시길 바랍니다! :no_entry_sign: ");
      }
      else
      {
        if(!infraction[member])
          infraction[member] = {infraction: 0, time: 0,};
        else
        {
          let kickedembed = new Discord.MessageEmbed()
            .setTitle(":no_entry_sign: "+ member.username +" 님이 경고 5번으로 킥 당하셨습니다! :no_entry_sign: ")
            .setColor('#c4002e')
            .setTimestamp()
            .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
          infraction[member] = {infraction: infraction[member].infraction + 1, time: soik,};
          if(infraction[member].infraction === "5")
          {
            member.kick(["경고 5번으로 마법지팡이 봇이 강퇴."]);
            message.channel.send(kickedembed);
          }
          fs.writeFile("./database/infraction.json", JSON.stringify(infraction), err => {if (err) throw err;});
        }
      }
    }
    if(command.startsWith("임베드"))
    {
      var argument3 = message.content.split(" | ");
      var toSend = message.mentions.channels.first();
      if(toSend === null)
      {
        message.channel.send(":x: 임베드를 보내실 채널을 입력해주세요! :x: ");
      }
      else if(argument3[1] === null || argument3[2] === null || argument3[3] === null)
      {
        message.channel.send(":x: 필요한 정보를 모두 채워주시기 바랍니다. :x:");
      }
      else
      {
        let embedembed = new Discord.MessageEmbed()
          .setTitle(argument3[1])
          .setColor(argument3[3])
          .setDescription(argument3[2])
          .setTimestamp()
          .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
      toSend.send(embedembed);
      }
    }
  }//check if prefix is correct ends
  if(command.startsWith("공부"))
  {
    const stopWatch = require('stopwatch-js');
    var argument1 = message.content.split(" ");
    const userwatch = new stopWatch();
    if(argument1[1] === "시작")
    {
      userwatch.start();
      let stopwatchstart = new Discord.MessageEmbed()
        .setTitle(message.member.user.tag + "님이 공부를 시작했습니다!")
        .setDescription("=공부 종료를 하시면 결과를 보내드립니다.")
        .setColor("#61eb34")
        .setTimestamp()
        .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
      message.channel.send(stopwatchstart);
      stopwatcharray.push(message.author.id);
    } //공부 시작
    else if(argument1[1] === "종료")
    {
      if(stopwatcharray.indexOf(message.author.id) != -1)
      {
        var n = stopwatcharray.indexOf(message.author.id);
        let stopwatchstopped = new Discord.MessageEmbed()
          .setTitle(":green_square: " + message.member.user.tag + "님이 공부를 종료했습니다! :green_square:")
          .setDescription(userwatch.duration() + "동안 공부하셨습니다! 수고하셨습니다! :thumbsup: ")
          .setColor("#61eb34")
          .setTimestamp()
          .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
        message.channel.send(stopwatchstopped);
        stopwatcharray.splice(n, 1);
        userwatch.stop();
      }
      else if(stopwatcharray.indexOf(message.author.id) === -1)
      {
        let yangshim = new Discord.MessageEmbed()
          .setTitle("으음...?")
          .setDescription("당신은 양심도 없습니까? 공부를 하고 종료를 누르십시오 휴먼.")
          .setColor("#fc2003")
          .setTimestamp()
          .setFooter('http://invite.magicjipange.kro.kr', 'https://i.ibb.co/mG6TX82/unnamed-1.jpg');
        message.channel.send(yangshim);
      }
    } //공부 종료
  }
});
client.login(config.token);
