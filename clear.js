const config = require("./config")

const Discord = require("discord.js")
const client = new Discord.Client({user: config.secondacc.user})
client.login(config.secondacc.token)

client.on("ready", async () => {
    console.log("Starting...")
    client.guilds.cache.get(config.mguild).channels.cache.forEach(channel => {
        if(channel.type !== "text") return;
        if(!channel.topic) return;
        channel.delete()
    })
})