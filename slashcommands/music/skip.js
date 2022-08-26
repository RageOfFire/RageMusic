const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const currentTrack = queue.current;
    const success = queue.skip();
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Bỏ qua')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(success ? `✅ | Bỏ qua **${currentTrack}**!` : "❌ | Có gì đó sai sai!")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: embed });
}

module.exports = {
    name: "skip",
    category: "music",
    description: 'Bỏ qua bài hát hiện tại',
    permissions: [],
    devOnly: false, run
}