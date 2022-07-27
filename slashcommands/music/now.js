const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    return interaction.editReply({
        embeds: [
            {
                title: "Đang chơi",
                description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                fields: [
                    {
                        name: "\u200b",
                        value: progress
                    }
                ],
                color: 'faa152'
            }
        ]
    });
}

module.exports = {
    name: "now",
    category: "music",
    description: 'Xem thông tin bài hát hiện tại',
    permissions: [],
    devOnly: false, run
}