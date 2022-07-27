const run = async({client, interaction, player}) => {
    interaction.reply('still alive').catch((err) => {console.log(err)});
}

module.exports = {
    name: "ping",
    category: "info",
    description: 'Kiểm tra xem bot còn hoạt động không ?',
    permissions: [],
    devOnly: true, run
}