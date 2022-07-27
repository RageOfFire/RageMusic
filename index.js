const Discord = require("discord.js")
require("dotenv").config()
const { Player } = require("discord-player");

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_VOICE_STATES"
    ]
})

const player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let bot = {
    client,
    player,
    owner: ["279932957769072641"]
}

client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)

client.loadEvents(bot, false)
client.loadSlashCommands(bot, false)

module.exports = bot

client.login(process.env.TOKEN)