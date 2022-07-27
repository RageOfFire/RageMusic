const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const paused = queue.setPaused(false);
    return interaction.editReply({ content: !paused ? "❌ | Có gì đó sai sai!" : "▶ | Tiếp tục!" });
}

module.exports = {
    name: "resume",
    category: "music",
    description: 'Tiếp tục bài hát',
    permissions: [],
    devOnly: false, run
}