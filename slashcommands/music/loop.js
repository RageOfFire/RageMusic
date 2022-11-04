const { MessageEmbed } = require('discord.js')
const { QueueRepeatMode } = require("discord-player");
const run = async({client, interaction, player}) => {
    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return interaction.editReply({ content: "❌ | Không có bài hát nào đang chơi!" });
    const loopMode = interaction.options.getInteger("mode");
    const success = queue.setRepeatMode(loopMode);
    const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Vòng lặp')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(success ? `${mode} | Cập nhật vòng lặp!` : "❌ | Không thể cập nhật vòng lặp!")
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
    return interaction.editReply({ embeds: [embed] });
}

module.exports = {
    name: "loop",
    category: "music",
    description: 'Tùy chỉnh vòng lặp',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "mode",
            type: "INTEGER",
            description: "Cách lặp",
            required: true,
            choices: [
                {
                    name: "Tắt",
                    value: QueueRepeatMode.OFF
                },
                {
                    name: "Bài hát",
                    value: QueueRepeatMode.TRACK
                },
                {
                    name: "Hàng chờ",
                    value: QueueRepeatMode.QUEUE
                },
                {
                    name: "Tự động",
                    value: QueueRepeatMode.AUTOPLAY
                }
            ]
        }
    ], run
}