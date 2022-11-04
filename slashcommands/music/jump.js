const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const trackIndex = interaction.options.getInteger("track");
    queue.jump(trackIndex);
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Nhảy tới bài hát tiếp theo')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`⏭ | Đã nhảy tới **${queue.tracks[trackIndex].title}**!`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: [embed] });
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