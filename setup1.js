const config = require("./config")

const Discord = require("discord.js")
const client1 = new Discord.Client({user: config.firstacc.user})
client1.login(config.firstacc.token)
const client2 = new Discord.Client({user: config.secondacc.user})
client2.login(config.secondacc.token)

client1.on("ready", async () => {
    console.log("Starting...")
    client1.guilds.cache.get(config.lguild).channels.cache.forEach((channel,i) => {
        if(channel.type !== "text") return;
        if(config.filter.categoryid.includes(`${channel.parentID}`)) return;
        if(config.filter.channelid.includes(`${channel.id}`)) return;

        client2.guilds.cache.get(config.mguild).channels.create(channel.name, {topic: channel.id})
    })
})