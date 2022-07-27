const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const trackIndex = interaction.options.getInteger("track");
    queue.jump(trackIndex);
    return interaction.editReply({ content: `⏭ | Đã nhảy tới **${queue.tracks[trackIndex].title}**!` });
}

module.exports = {
    name: "jump",
    category: "music",
    description: 'Tùy chỉnh âm lượng',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "track",
            type: "INTEGER",
            description: "Số bài hát cần nhảy tới",
            required: true
        }
    ], run
}