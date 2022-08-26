const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const page = interaction.options.getNumber("page");
    const pageStart = 10 * (page ? page : 1 - 1);
    const pageEnd = pageStart + 10;
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
        return `${i + pageStart + 1}. **[${m.title}](${m.url})**`;
    });
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Hàng đợi')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`${tracks.join('\n')}${queue.tracks.length > pageEnd ? `\n...${queue.tracks.length - pageEnd} bài hát nữa` : 'Có cái nịt'}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .addField([
        { name: "Đang chơi", value: `🎶 | **[${currentTrack.title}](${currentTrack.url})**` }
    ])
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: embed })
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