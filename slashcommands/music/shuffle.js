const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    await queue.shuffle();
    return interaction.editReply({ content: '✅ | Hàng đợi đã được tráo trộn!' });
}

module.exports = {
    name: "shuffle",
    category: "music",
    description: 'Tráo trộn hàng đợi',
    permissions: [],
    devOnly: false, run
}