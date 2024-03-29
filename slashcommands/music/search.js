const { QueryType } = require("discord-player");
const { MessageEmbed } = require('discord.js')
const run = async ({ client, interaction, player }) => {
    if (!interaction.member.voice.channel)
        return interaction.reply({ content: "Bạn cần ở trong kênh thoại để sử dụng lệnh này", ephemeral: true })
    else if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId)
        return interaction.reply({ content: "Bạn không ở cùng kênh thoại với tôi", ephemeral: true })
    await interaction.deferReply();
    const keyword = interaction.options.getString("keyword");
    const searchResult = await player
        .search(keyword, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })
        .catch(() => { });
    if (!searchResult || !searchResult.tracks.length) return interaction.editReply({ content: "Không tìm thấy kết quả" });

    const queue = await player.createQueue(interaction.guild, {
        metadata: interaction.channel
    });
    try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
        player.deleteQueue(interaction.guildId);
        return interaction.editReply({ content: "không thể vào kênh thoại của bạn" });
    }
    let descriptions = [];
    const maxTracks = searchResult.tracks.slice(0, 10);
    for (let i = 0; i < maxTracks.length; i++) {
        descriptions.push(`🎶 | **${i + 1}**. ${maxTracks[i].title} | ${maxTracks[i].author}`);
    }
    const embed = new MessageEmbed()
        .setColor('#faa152')
        .setTitle(`Kết quả tìm kiếm cho ${keyword}`)
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(descriptions.join("\n"))
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addFields(
            { name: "Được đề xuất bởi:", value: `${interaction.user.username}`, inline: true },
            { name: "Lựa chọn:", value: `**1** tới **${maxTracks.length}** hoặc **cancel**`, inline: true }
        )
    await interaction.editReply({ embeds: [embed] }).catch((err) => { console.log(err) });
    const collector = interaction.channel.createMessageCollector({
        time: 60000,
        max: 1,
        errors: ['time'],
        filter: m => m.author.id === interaction.member.id
    });
    collector.on('collect', async (query) => {
        if (query.content.toLowerCase() === 'cancel') return interaction.editReply({ content: `✅ | Quá trình tìm kiếm bị hủy`, ephemeral: true }), collector.stop();

        const value = parseInt(query);
        if (!value || value <= 0 || value > maxTracks.length) return interaction.editReply({ content: `❌ | Phản hồi không hợp lệ, thử giá trị trong khoảng **1** tới **${maxTracks.length}** hoặc **cancel**... để hủy tìm kiếm ?`, ephemeral: true });

        collector.stop();

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            await player.deleteQueue(interaction.guildId);
            return interaction.editReply({ content: `❌ | Bro tôi không vào được kênh thoại ${interaction.member}... cứu !`, ephemeral: true });
        }

        const embed = new MessageEmbed()
            .setColor('#faa152')
            .setTitle(`🎧 | Đang tải bài hát của bạn chờ xíu...`)
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setDescription(`🎶 | **${value}**. ${searchResult.tracks[query.content - 1].title} | ${searchResult.tracks[query.content - 1].author}`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        await interaction.editReply({ embeds: [embed] }).catch((err) => { console.log(err) });

        queue.addTrack(searchResult.tracks[query.content - 1]);

        if (!queue.playing) await queue.play();
    });
    collector.on('end', (msg, reason) => {
        if (reason === 'time') return interaction.editReply({ content: `❌ | Hết thời gian tìm kiếm ${interaction.member}... Bye !`, ephemeral: true })
    });
}

module.exports = {
    name: "search",
    category: "music",
    description: 'Tìm kiếm bài hát',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "keyword",
            type: "STRING",
            description: "Từ khóa",
            required: true
        }
    ], run
}