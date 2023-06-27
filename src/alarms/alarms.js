const axios = require("axios");

axios.defaults.baseURL = "https://api.ukrainealarm.com/api/v3/alerts";
axios.defaults.headers.common.Authorization = process.env.ALARM_TOKEN;

const alarms = async (msg, bot) => {
  const chatId = msg?.chat?.id;

  const { data } = await axios.get();
  const alarms = data?.map((el) => `🆘 ${el.regionName} 🆘 \n`).join("");

  console.log(alarms);
  bot.sendMessage(chatId, alarms);
};

module.exports = { alarms };
