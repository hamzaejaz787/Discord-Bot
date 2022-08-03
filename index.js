import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const rest = new REST({ version: "10" }).setToken(TOKEN);

client.on("ready", () => console.log(`${client.user.tag} has logged in...`));

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    interaction.reply({
      content: `You have ordered a ${
        interaction.options.get("food").value
      } and a ${interaction.options.get("drink").value}`,
    });
  }
});

// client.on("messageCreate", (message) => {
//   console.log(`${message.author.tag}: ${message.content}`);
// });

(async function main() {
  const commands = [
    {
      name: "order",
      description: "Order something...",
      options: [
        {
          name: "food",
          description: "type of food",
          type: 3,
          required: true,
          choices: [
            { name: "Burger", value: "burger" },
            { name: "Pizza", value: "pizza" },
          ],
        },
        {
          name: "drink",
          description: "type of drink",
          type: 3,
          required: false,
          choices: [
            { name: "Water", value: "water" },
            { name: "Coke", value: "coke" },
            { name: "Sprite", value: "sprite" },
          ],
        },
        {
          name: "dessert",
          description: "type of dessert",
          type: 3,
          required: false,
          choices: [
            { name: "Strawberry Cake", value: "strawberry cake" },
            { name: "Chocolate Cake", value: "chocolate cake" },
          ],
        },
      ],
    },
  ];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
})();
