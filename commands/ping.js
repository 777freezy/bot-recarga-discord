const { SlashCommandBuilder } = require('@discordjs/builders');

//comando simples para calcular o ping do usuario e do bot. rsrs
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Calcula o ping do bot'),

  async execute(interaction) {
    await interaction.reply(`🏓 Pong! A latência é ${Date.now() - interaction.createdTimestamp}ms.`);
  },
};
