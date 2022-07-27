const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    await queue.setFilters({
        bassboost: !queue.getFiltersEnabled().includes("bassboost"),
        normalizer2: !queue.getFiltersEnabled().includes("bassboost")
    });

    return interaction.editReply({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "đã bật" : "đã tắt"}!` });
}

module.exports = {
    name: "bassboost",
    category: "music",
    description: 'Tăng cường âm thanh',
    permissions: [],
    devOnly: false, run
}