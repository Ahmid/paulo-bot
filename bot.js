const TeleBot = require('telebot');
const bot = new TeleBot('372091526:AAHdKP9UQsi8FTBqsmJ0P2hX4BdnkUTIEG0');

bot.on('text', msg => {
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
});


bot.connect();