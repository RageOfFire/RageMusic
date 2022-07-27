const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const time = interaction.options.getInteger("time");
    const second = time * 1000;
    await queue.seek(second);
    return interaction.editReply({ content: `✅ | Nhảy tới ${second / 1000} giây` });
}

module.exports = {
    name: "seek",
    category: "music",
    description: 'Nhảy tới thời gian nào đó',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "time",
            type: "INTEGER",
            description: "Thời gian nhảy tới (theo giây)",
            required: true
        }
    ], run
}