module.exports = {
    name: "ready",
    run: async(bot) => {
        const { client } = bot;
        
        bot.client.user.setActivity("/help", {
            type: "LISTENING",
        });
        client.application.commands.set([...client.slashcommands.values()])
        console.log("logged as " + bot.client.user.tag)
    }
}