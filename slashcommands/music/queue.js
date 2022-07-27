const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const page = interaction.options.getNumber("page");
    const pageStart = 10 * (page ? page : 1 - 1);
    const pageEnd = pageStart + 10;
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
        return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
    });

    return interaction.editReply({
        embeds: [
            {
                title: "Hàng đợi",
                description: `${tracks.join('\n')}${
                    queue.tracks.length > pageEnd
                        ? `\n...${queue.tracks.length - pageEnd} bài hát nữa`
                        : 'Có cái nịt'
                }`,
                color: 'faa152',
                fields: [{ name: "Đang chơi", value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
            }
        ]
    })
}

module.exports = {
    name: "queue",
    category: "music",
    description: 'Danh sách hàng đợi',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "page",
            type: "NUMBER",
            description: "Trang thứ ? của hàng đợi",
        }
    ], run
}