const cheerio = require("cheerio");
const axios = require("axios");

const parsing = async (msg, bot) => {
  const chatId = msg?.chat?.id;

  const getHtml = async (url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  };
  const data = await getHtml("https://rezka.ag/series/best/2023/page/1/");
  const films = data("div.b-content__inline_item").each((i, elem) => {
    // const title = data(elem).find("div.b-content__inline_item-link").text();
    const img = data(elem).find("a").attr("href");
    // console.log("img", img);
    bot.sendMessage(chatId, img);
  });

  //   $.html();
  //   bot.sendMessage(chatId, "tester");
};

module.exports = { parsing };
