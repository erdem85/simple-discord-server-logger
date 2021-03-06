const config = require("./config")

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('channels.json')
const db = low(adapter)

const Discord = require("discord.js")
const client = new Discord.Client({user: config.oneacc ? config.firstacc.user : config.secondacc.user})
client.login(config.oneacc ? config.firstacc.user : config.secondacc.user)

client.on("ready", async () => {
    console.log("Starting...")
    console.log("this step may take a long time, please wait")
    client.guilds.cache.get(config.mguild).channels.cache.forEach(async channel => {
        if(channel.type !== "text") return;
        if(!channel.topic) return;
        hooks = await channel.fetchWebhooks();
        if(hooks.size > 0) return;
        channel.createWebhook('Some-Username').then(hook => {
            db.set(channel.topic, hook.url).write()
        })
    })
})
