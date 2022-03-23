// Require the necessary discord.js classes
const { Client, Intents, Message, MessageEmbed } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code
client.on("ready", () => {
  console.log(`${client.user.tag} has logged in!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  } else if (message.content.toLowerCase() === "hello") {
    message.reply("Hello");
  }

  if (message.content == "$listCommands") {
    const exampleEmbed = new MessageEmbed()
      .setColor("#ffd046")
      .setTitle("Server Commands")
      .setDescription(
        "Here you can see the list of the commands used on the server: "
      )
      .addFields(
        { name: "`$like`", value: "Likes the current message" },
        { name: "`$dislike`", value: "Dislikes the current message" },
        { name: "`$random`", value: "Returns a random number" }
      );
    message.channel.send({ embeds: [exampleEmbed] });
  }

  if (message.content === "$like") {
    message.react("👍");
  }

  if (message.content === "$dislike") {
    message.react("👎");
  }

  if (message.content === "$random") {
    let randomNumber = getRandomNumber(0, 1000);
    message.reply(`Here's a random number for you ${randomNumber}`);
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  console.log(`[${message.author.tag}]: ${message.content}`);
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN).then(() => {
  client.user.setPresence({
    activities: [{ name: "music", type: "LISTENING" }],
    status: "online",
  });
});
