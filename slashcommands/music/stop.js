const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    queue.destroy();
    return interaction.editReply({ content: "🛑 | Dừng bài hát! Xóa hàng đợi..." });
}

module.exports = {
    name: "stop",
    category: "music",
    description: 'Dừng phát nhạc, xóa hàng đợi',
    permissions: [],
    devOnly: false, run
}