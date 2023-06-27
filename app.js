const TelegramBot = require("node-telegram-bot-api");
const request = require("request");
require("dotenv").config();
const { currency } = require("./src/currency/currency");
const { parsing } = require("./src/parsing/parsing");
const { alarms } = require("./src/alarms/alarms");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// // // Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/curse/, (msg) => {
  currency(msg, bot);
});

bot.onText(/\/films/, (msg) => {
  parsing(msg, bot);
});
bot.onText(/\/alarms/, (msg) => {
  alarms(msg, bot);
});

// // Matches "/echo [whatever]"
// bot.onText(/\/curse/, (msg, match) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, "Яка валюта вас цікавить?", {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: "€ - EUR",
//             callback_data: "EUR",
//           },
//           {
//             text: "$ - USD",
//             callback_data: "USD",
//           },
//         ],
//       ],
//     },
//   });
// });

// bot.on("callback_query", (query) => {
//   const id = query.message.chat.id;
//   request(
//     "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
//     function (error, response, body) {
//       const data = JSON.parse(body);

//       const result = data.filter((item) => item.ccy === query.data)[0];
//       const flags = {
//         EUR: "🇪🇺",
//         USD: "🇺🇸",
//         UAH: "🇺🇦",
//       };
//       console.log("result:", result);

//       let md = `*${flags[result?.ccy]} ${result?.ccy} 💱 ${result?.base_ccy} ${
//         flags[result?.base_ccy]
//       }*
//        Buy: _${result?.buy}
//        Sale: _${result?.sale}`;
//       bot.sendMessage(id, md, { parse_mode: "Markdown" });
//     }
//   );
// });
currency();
// Listen for any kind of message. There are different kinds of
// messages.
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message");
// });
