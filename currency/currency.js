const request = require("request");

const currency = (msg, bot) => {
  const chatId = msg?.chat?.id;

  bot?.sendMessage(chatId, "Яка валюта вас цікавить?", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "€ - EUR",
            callback_data: "EUR",
          },
          {
            text: "$ - USD",
            callback_data: "USD",
          },
        ],
      ],
    },
  });

  bot?.on("callback_query", (query) => {
    const id = query.message.chat.id;
    request(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
      function (error, response, body) {
        const data = JSON.parse(body);

        const result = data.filter((item) => item.ccy === query.data)[0];
        const flags = {
          EUR: "🇪🇺",
          USD: "🇺🇸",
          UAH: "🇺🇦",
        };

        let md = `*${flags[result?.ccy]} ${result?.ccy} 💱 ${
          result?.base_ccy
        } ${flags[result?.base_ccy]}*
       Buy: _${result?.buy}
       Sale: _${result?.sale}`;
        console.log("md:", md);

        bot.sendMessage(id, md, { parse_mode: "Markdown" });
      }
    );
  });
};

module.exports = { currency };
