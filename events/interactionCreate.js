module.exports = {
    name: "interactionCreate",
    run: async (bot, interaction) => {
        if(interaction.isCommand()) handleSlashCommand(bot, interaction)
    },
}

const handleSlashCommand = (bot, interaction) => {
    const { client, player, owner } = bot
    if(!interaction.inGuild()) return interaction.editReply('this command can be used in server only')
    
    const slashcmd = client.slashcommands.get(interaction.commandName)
    if(!slashcmd) return interaction.editReply("Invalid slash command")

    let member = interaction.user
    if (slashcmd.devOnly && !owner.includes(member.id)) {
        return interaction.reply("Lệnh này đang trong chế độ phát triển")
    }

    if(slashcmd.permissions && !interaction.member.permissions.has(slashcmd.permissions))
        return interaction.editReply("You don't have permission")
    slashcmd.run({...client, interaction, player});
}