const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    queue.clear();
    return interaction.editReply({ content: '✅ | Xóa sạch hàng đợi.' });
}

module.exports = {
    name: "clear",
    category: "music",
    description: 'Xóa sạch hàng đợi',
    permissions: [],
    devOnly: false, run
}