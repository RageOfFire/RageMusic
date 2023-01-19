const { getFiles } = require("../util/functions")

module.exports = (bot, reload) => {
    const { client } = bot

    let events = getFiles("./events/", ".js")

    if (events.length == 0) {
        console.log("No events");
    }
    events.forEach((f, i) => {
        if (reload)
            delete require.cache[require.resolve(`../events/${f}`)]
        const event = require(`../events/${f}`)
        client.events.set(event.name, event)

        if (!reload)
            console.log(`${i+1}. ${f} loaded`)
    })

    if (!reload)
        initEvents(bot)
}

function triggerEventHandler(bot, event, ...args) {
    const { client } = bot
    try {
        if (client.events.has(event))
            client.events.get(event).run(bot, ...args)
        else
            throw new Error(`Event ${event} not found`)
    } catch (err) {
        console.error(err)
    }
}

function initEvents(bot) {
    const { client, player } = bot

    client.on('ready', () => {
        triggerEventHandler(bot, "ready")
    })
    client.on("interactionCreate", (interaction) => {
        triggerEventHandler(bot, "interactionCreate", interaction)
    })
    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Lỗi phát hàng đợi: ${error.message}`);
    });
    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Lỗi kết nối: ${error.message}`);
    });
    
    // player.on("trackStart", (queue, track) => {
    //     queue.metadata.send(`🎶 | Bắt đầu chơi: **${track.title}** trong **${queue.connection.channel.name}**!`);
    // });
    
    // player.on("trackAdd", (queue, track) => {
    //     queue.metadata.send(`🎶 | Bài hát **${track.title}** đã được thêm vào hàng đợi!`);
    // });
    
    // player.on("botDisconnect", (queue) => {
    //     queue.metadata.send("❌ | Tôi đã bị ngắt kết nối khỏi kênh thoại theo cách thủ công, đang xóa hàng đợi!");
    // });
    
    // player.on("channelEmpty", (queue) => {
    //     queue.metadata.send("❌ | Không có ai trong kênh thoại, đang rời đi ...");
    // });
    
    // player.on("queueEnd", (queue) => {
    //     queue.metadata.send("✅ | Hàng đợi đã hết!");
    // });
}