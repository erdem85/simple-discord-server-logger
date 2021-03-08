const config = require("./config")

const Discord = require("discord.js")
const client1 = new Discord.Client({user: config.firstacc.user})
client1.login(config.firstacc.token)
const client2 = new Discord.Client({user: config.oneacc ? config.firstacc.user : config.secondacc.user})
client2.login(config.oneacc ? config.firstacc.token : config.secondacc.token)

client1.on("ready", async () => {
    console.log("Starting...")
    const channels = client1.guilds.cache.get(config.lguild).channels.cache;
    const guild = client2.guilds.cache.get(config.mguild)
    channels.filter(ch => ch.type == "text").forEach(channel => {
        guild.channels.create(channel.name, {type: channel.type, topic: channel.id, position: channel.position})
    })
})
