const { MessageEmbed } = require('discord.js')
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    const mode = interaction.options.getBoolean("mode");
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    if(queue) {
        if(mode) {
            queue.options.leaveOnEnd = false;
            queue.options.leaveOnStop = false;
            queue.options.leaveOnEmpty = false;
            queue.options.initialVolume = 80;
            queue.options.bufferingTimeout = 200;
        }
        else {
            queue.options.leaveOnEnd = false;
            queue.options.leaveOnStop = true;
            queue.options.leaveOnEmpty = true;
            queue.options.leaveOnEmptyCooldown = 60 * 1000 * 3;
        }
        const embed = new MessageEmbed()
        .setColor('#faa152')
        .setTitle('24/7 Mode')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(mode ? '✅ | Đã bật chế độ 24/7!' : '✅ | Đã tắt chế độ 24/7!')
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        interaction.editReply({ embeds: [embed] }).catch((err) => {console.log(err)});
    }
}

module.exports = {
    name: "247",
    category: "music",
    description: 'Bật chế độ 24/7',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "mode",
            type: "BOOLEAN",
            description: "Bật/tắt chế độ 24/7",
        }
    ], run
}