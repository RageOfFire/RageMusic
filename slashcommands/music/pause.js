const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const paused = queue.setPaused(true);
    return interaction.editReply({ content: paused ? "⏸ | Tạm dừng!" : "❌ | Có gì đó sai sai!" });
}

module.exports = {
    name: "pause",
    category: "music",
    description: 'Tạm dừng bài hát',
    permissions: [],
    devOnly: false, run
}