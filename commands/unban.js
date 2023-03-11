const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Remove o banimento de um usuário.')
        .addUserOption(option => option.setName('usuário').setDescription('Usuário para remover o banimento.').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('Você não tem permissão para usar este comando.');
        }

        const user = interaction.options.getUser('usuário');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply('Este usuário não está banido.');
        }

        await interaction.guild.members.unban(user.id);
        return interaction.reply(`O banimento do usuário ${user.tag} foi removido.`);
    },
};
