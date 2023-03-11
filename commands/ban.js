const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bane um usuário do servidor.')
        .addUserOption(option => option.setName('usuário').setDescription('Usuário para banir.').setRequired(true))
        .addStringOption(option => option.setName('motivo').setDescription('Motivo do banimento.'))
        .addIntegerOption(option => option.setName('tempo').setDescription('Duração do banimento em segundos (banimento temporário).')),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply('Você não tem permissão para usar este comando.');
        }

        const member = interaction.options.getMember('usuário');
        const reason = interaction.options.getString('motivo') || 'Nenhum motivo especificado.';
        const tempoPunicao = interaction.options.getInteger('tempo');
        const user = member.user;
        const tempoEmSegundos = tempoPunicao * 3600;
        const embed = new EmbedBuilder()
                    .setColor('#FF0000'); 

                    let banTime;
                    if (tempoPunicao >= 24) {
                        // se o tempo for maior ou igual a 24 horas, exibe em dias
                        let dias = Math.ceil(tempoPunicao / 24);
                        banTime = `${dias} dia(s)`;
                    } else {
                        // caso contrário, exibe em horas
                        banTime = `${tempoPunicao} hora(s)`;
                    }

                    if (tempoPunicao !== null) {
                        // Banimento temporário
                        const tempoEmSegundos = tempoPunicao * 3600;
                        const horas = Math.floor(tempoEmSegundos / 3600); // calcular a duração em horas
                        const minutos = Math.floor((tempoEmSegundos % 3600) / 60); // calcular a duração em minutos restantes
                        const segundos = tempoEmSegundos % 60; // calcular a duração em segundos restantes
                        const banTime = `${horas} hora(s), ${minutos} minuto(s) e ${segundos} segundo(s)`;
                        
                        await member.ban({ reason: reason })
                            .then(() => {
                                embed.setDescription(`O usuário ${member} foi punido.  \n  \n motivo: ${reason} \n \n tempo de punimento: \`${banTime}\` \n \n Lembre-se de ler o canal <#1012144710858584094>! \n • Horário da punição hoje as ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
                                embed.setThumbnail(user.displayAvatarURL());
                                interaction.reply({ embeds: [embed] });
                                setTimeout(() => {
                                    interaction.guild.members.unban(user.id)
                                    .then(() => {
                                    })
                                        .catch(err => {
                                            console.error(err); 
                                            interaction.channel.send('Ocorreu um erro ao desbanir o usuário.');
                                        });
                                }, tempoEmSegundos * 1000);
                            })
                            .catch(err => {
                                console.error(err);
                                embed.setDescription('Ocorreu um erro ao banir o usuário.');
                                interaction.reply({ embeds: [embed] });
                            });
}  
                     else {
                        await member.ban({ reason: reason })
                            .then(() => {
                                embed.setDescription(`O usuário ${member} banido permanentemente!.  \n  \n motivo: ${reason}  \n \n Lembre-se de ler o canal <#1012144710858584094>! \n • Horário da punição hoje as ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
                                .setThumbnail(user.displayAvatarURL());
                                interaction.reply({ embeds: [embed] });
                            })
                            .catch(err => {
                                console.error(err);
                                embed.setDescription('Ocorreu um erro ao banir o usuário.');
                                interaction.reply({ embeds: [embed] });
                            });
        }
    },
};
