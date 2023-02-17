const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { token } = require("./config.json");


const client = new Client({ intents: [GatewayIntentBits.Guilds]});


//esse codigo cria o bot usando a função de callback no ready, o set setPresence usamos para definir o estado do bot.
client.once('ready', () => {
  console.log(`Logado como ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: 'assistindo felipe reis' }],
    status: 'online',
  });  
});

//essa função vai ouvir a interação do usuario com o bot.
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true });
    }
});


client.commands = new Collection(); //o Collection usamos para armazenar os comandos do bot

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] the command at ${filePath} is missing rrquire`)
    }
}

client.login(token);//esse aqui importamos o token do config.json