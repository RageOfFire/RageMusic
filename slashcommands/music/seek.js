const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const time = interaction.options.getInteger("time");
    const second = time * 1000;
    await queue.seek(second);
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Nhảy tới')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`✅ | Nhảy tới ${second / 1000} giây`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: [embed] });
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