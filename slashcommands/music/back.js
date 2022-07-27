const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    await queue.back();
    return interaction.editReply({ content: '✅ | Chơi lại bài hát trước!' });
}

module.exports = {
    name: "back",
    category: "music",
    description: 'Chơi lại bài hát trước',
    permissions: [],
    devOnly: false, run
}