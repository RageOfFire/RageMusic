const { Pagination } = require('pagination.djs');
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const currentTrack = queue.current;
    const trackLength = queue.tracks.length;
    let descriptions = [];
    for(let i = 0; i < trackLength; i++) {
        descriptions.push(`${i + 1}. **[${queue.tracks[i].title}](${queue.tracks[i].url})** - ${queue.tracks[i].duration} - ${queue.tracks[i].requestedBy}`);
    }
    const pagination = new Pagination(interaction, { limit: 10 })
    .setColor('#faa152')
    .setTitle('Hàng đợi')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescriptions(descriptions)
    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .addFields([
        { name: "Đang chơi", value: `🎶 | **[${currentTrack.title}](${currentTrack.url})**`, inline: true },
        { name: "Được đề xuất bởi:", value: `${interaction.user.tag}`, inline: true }
    ])
    await pagination.render().catch((err) => {console.log(err)});
}

module.exports = {
    name: "queue",
    category: "music",
    description: 'Danh sách hàng đợi',
    permissions: [],
    devOnly: false, run
}