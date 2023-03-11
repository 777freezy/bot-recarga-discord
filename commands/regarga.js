<<<<<<< HEAD
const { SlashCommandBuilder } = require('discord.js');
=======
const { SlashCommandBuilder } = require('@discordjs/builders');
>>>>>>> d5b52c3 (command ban)
const { EmbedBuilder } = require('discord.js');

//aqui criamos o comando do bot
module.exports = {
  data: new SlashCommandBuilder()
    .setName('recarga') //cria o nome do comando
    .setDescription('Calcula o valor da recarga') // descrição do comando
    .addIntegerOption(option => //essa perte cria o input de interação para o usuario inserir o valor.
      option.setName('valor')
        .setDescription('Valor da recarga')
        .setRequired(true)),

	

		async execute(interaction) { //essa linha vai executar o comando
		const valor = interaction.options.getInteger('valor'); //esse comando vai pegar e guardar o valor em uma variavel.
			
		const embed = new EmbedBuilder(); //criamos uma variavel do EmbedBuilder, pois vamos usar ela para formatar a resposta do nosso bot para deixar mais bonitinha

		console.log(valor) //esse comando só vai imprimir o valor inserido pelo usuario no terminal
			
			/*
			esse escopo de if faz o segunte, ele verifica o valor inserido pelo usuario.
			Caso o valor seja 500 ou inferior, ele vai usar a cotação 1.20, caso seja maior de 500 ele vai usar a cotação de 1.22.
		*/
<<<<<<< HEAD
		if (valor <= 500) {	
=======
		if (valor <= 499) {	
>>>>>>> d5b52c3 (command ban)

			const cotacao = 1.20

			const resultado = (valor / cotacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
		
				embed.setColor('#3766b9')
				.setTitle("Calculadora de conversão de (¥ para R$)")
<<<<<<< HEAD
				.setThumbnail('https://i.imgur.com/O00IqK0.png')
=======
				.setThumbnail('https://i.imgur.com/4mZtyET.png')
>>>>>>> d5b52c3 (command ban)
				.setDescription(`  Você vai receber: ¥${valor}\n\n Você fará uma recarga de: ${resultado} usando (<#1033561390436335617>) \n
				 Os valores/cotação podem ter ser alterados sem aviso prévio \n • Hoje as ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
			
		}else {
			const cotacao = 1.22

			const resultado = (valor / cotacao).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
		
				embed.setColor('#3766b9')
				.setTitle("Cotação (¥ para R$)")
<<<<<<< HEAD
				.setThumbnail('https://i.imgur.com/JRauOeg.png')
				.setDescription(`Você vai receber: ¥${valor}\n\nVocê irá recarregar com (<#1033561390436335617>) ${resultado} \n
				\n Os valores podem ser alterados sem aviso prévio \n • Hoje as ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
=======
				.setThumbnail('https://i.imgur.com/4mZtyET.png')
				.setDescription(`  Você vai receber: ¥${valor}\n\n Você fará uma recarga de: ${resultado} usando (<#1033561390436335617>) \n
				 Os valores/cotação podem ter ser alterados sem aviso prévio \n • Hoje as ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
>>>>>>> d5b52c3 (command ban)
		}

		  await interaction.reply({ embeds: [embed] }); //esse comando vai enviar a resposta com o resultato para o usuario junto com a mensgame formatada.
		},
	}