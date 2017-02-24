var express = require ('express');
var app = express();
var PORT = process.env.PORT || 3005;

var middleware = require ('./middleware.js');

app.use (middleware.logger);

app.get('/about',middleware.requireAuthentication ,function (req, res) {
    res.send('about us!!');
});

app.use(express.static(__dirname + "/public"));

// const TeleBot = require('telebot');
// const bot = new TeleBot('372091526:AAHdKP9UQsi8FTBqsmJ0P2hX4BdnkUTIEG0');

// bot.on('text', msg => {
//   let fromId = msg.from.id;
//   let firstName = msg.from.first_name;
//   let reply = msg.message_id;
//   return bot.sendMessage(fromId, `Welcome, ${ firstName }!`, { reply });
// });
// bot.connect();

app.listen(PORT, function () {
    console.log ('Express server started on port ' + PORT + '!');
});