const { MessageEmbed } = require('discord.js')
const { QueryType } = require("discord-player");
const run = async({client, interaction, player}) => {
    if (!interaction.member.voice.channel) 
    return interaction.reply({content: "Bạn cần ở trong kênh thoại để sử dụng lệnh này", ephemeral: true })
    else if(interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) 
    return interaction.reply({content: "Bạn không ở cùng kênh thoại với tôi", ephemeral: true })
    await interaction.deferReply();
    const url = interaction.options.getString("url");
    const type = interaction.options.getInteger("type");
    const searchResult = await player
    .search(url, {
        requestedBy: interaction.user,
        searchEngine: type || QueryType.YOUTUBE_VIDEO
    })
    .catch(() => {});
    const song = searchResult.tracks[0];
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
    const embed = new MessageEmbed()
    .setColor('#faa152')
    .setTitle('Chơi')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription(`⏱ | Đang tải bài hát **[${song.title}](${song.url})**...`)
    .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter({ text: `Được đề xuất bởi ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });
    await interaction.editReply({ embeds: [embed] }).catch((err) => {console.log(err)});
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();
}

module.exports = {
    name: "play",
    category: "music",
    description: 'Chơi nhạc theo link nếu type không được chọn thì sẽ mặc định là youtube',
    permissions: [],
    devOnly: false,
    options: [
        {
            name: "url",
            type: "STRING",
            description: "link của bài hát",
            required: true
        },
        {
            name: "type",
            type: "INTEGER",
            description: "Lựa chọn",
            required: false,
            choices: [
                {
                    name: "SoundCloud",
                    value: QueryType.SOUNDCLOUD_TRACK
                },
                {
                    name: "Spotify",
                    value: QueryType.SPOTIFY_SONG
                }
            ]
        }
    ], run
}