const config = require("./config")
const channels = require("./channels.json");

const Discord = require("discord.js");
const client1 = new Discord.Client({user: config.firstacc.user})
const client2 = new Discord.Client({user: config.oneacc ? config.firstacc.user : config.secondacc.user})
client1.login(config.firstacc.token)
client2.login(config.oneacc ? config.firstacc.token : config.secondacc.token)
client1.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (!msg.guild) return;
    url = "";
    if (msg.guild.id == config.lguild) {
      if (msg.attachments.array().length > 0) {
        url = msg.attachments.array()[0].url;
      }
      console.log(`${msg.author.tag} : ${msg.content} (${msg.channel.name})`);
      if (!channels[`${msg.channel.id}`]) {
        return;
      } else {
          let hookbilgi = channels[`${msg.channel.id}`].split("/");
          let hook = new Discord.WebhookClient(`${hookbilgi[5]}`, `${hookbilgi[6]}`);
          hook.send(msg.content || " " + `\n${url}`, {
            username: msg.author.tag,
            avatarURL: msg.author.avatarURL({
              format: "png",
              size: 1024,
              dynamic: false,
            }),
          });
      }
    }
  });

  client2.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (msg.guild.id !== config.mguild) return;
    if (msg.content == "--ping") {
      msg.delete();
      
      msg.channel.send(`Pong! WS1: **${client1.ws.ping}**ms. & WS2: **${client2.ws.ping}**ms`);
    }
    if (msg.content == "--uptime") {
      let totalSeconds = client1.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      let uptime = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;
      msg.delete();
      msg.channel.send("Uptime: "+uptime);
    }
  });

// for uptimers

const express = require("express");
const app = express();
app.get("*", (req,res) => res.send("Server online!"));
app.listen(8080, () => {})
