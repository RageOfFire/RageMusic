const run = async({client, interaction, player}) => {
    interaction.reply(`📡 **Ping:** ${client.ws.ping} - ⏱ **Latency:** ${Date.now() - interaction.createdTimestamp}ms.`).catch((err) => {console.log(err)});
}

module.exports = {
    name: "ping",
    category: "info",
    description: 'Kiểm tra xem bot còn hoạt động không ?',
    permissions: [],
    devOnly: false, run
}