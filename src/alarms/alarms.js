const axios = require("axios");
const moment = require('moment')

axios.defaults.baseURL = "https://api.ukrainealarm.com/api/v3/alerts";
axios.defaults.headers.common.Authorization = process.env.ALARM_TOKEN;

const alarms = async (msg, bot) => {
  const chatId = msg?.chat?.id;

  const { data } = await axios.get();
  var options = {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const alarmDuration = (date) => {
    moment.locale('uk');
    const date1 = moment(Date.now());
const date2 = moment(date).fromNow(true)
return date2
//    return date1.diff(date2) / 36000
  }
  const alarms = data
    ?.map(
      (el) =>
        `🆘 ${el.regionName}. \n Тривога почалась: ${moment(el.lastUpdate).utcOffset(0).format(" DD MMM  YYYY, kk:mm:ss")}  \n Тривога триває: ${
          alarmDuration(el.lastUpdate)
        } 🆘 \n\n`
    )
    .join("");

  console.log(alarms);
  bot.sendMessage(chatId, alarms);
};

module.exports = { alarms };
