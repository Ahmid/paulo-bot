var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var PORT = process.env.PORT || 3005;

const TeleBot = require('telebot');
const bot = new TeleBot('305749132:AAF7gJgtnYp4lV4K1cRZ4ANv5eA6xe3rHjs');

var PauloQuotes = [];
var KafkaQuotes = [];
var date = new Date();
var month = date.getUTCMonth();


function FillPauloArray (page) {
    url = 'https://www.goodreads.com/author/quotes/566.Paulo_Coelho?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace(/[^a-zA-Z ]/g, "").trim();

                PauloQuotes.push(data + ".");
            });
        }
    });
}

function FillKafkaArray (page) {
    url = 'https://www.goodreads.com/author/quotes/5223.Franz_Kafka?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace(/[^a-zA-Z ]/g, "").trim();

                KafkaQuotes.push(data + ".");
            });
        }
    });
}

bot.on(['text','audio','voice','photo'], msg => {
    let fromId = msg.from.id;

    return bot.sendMessage(fromId, "Type / followed by writer's name to get the daily quote!" + 
    "\n\nExample:\n/paulo\n/kafka");
});

bot.on('/start', msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;

    return bot.sendMessage(fromId, "Hello " + firstName + "! 😊\nHope you will enjoy the daily quotes!");
});

bot.on(['/paulo','/Paulo','/PAULO'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;

    var newDate = new Date();
    if (newDate.getUTCMonth() > month) {
        FillPauloArray (newDate.getUTCMonth());
        month = newDate.getUTCMonth();
    }

    var day = date.getUTCDate();
    if (day === 31) {
        day = 0;
    }
    return bot.sendMessage(fromId, "Today's Paulo quote:\n" + PauloQuotes[day]);
});

bot.on(['/kafka','/Kafka','KAFKA'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;

    var newDate = new Date();
    if (newDate.getUTCMonth() > month) {
        FillPauloArray (newDate.getUTCMonth());
        month = newDate.getUTCMonth();
    }

    var day = date.getUTCDate();
    if (day === 31) {
        day = 0;
    }
    return bot.sendMessage(fromId, "Today's Kafka quote:\n" + KafkaQuotes[day]);
});
bot.connect();


FillPauloArray(month);
FillKafkaArray(month);
app.listen(PORT)
exports = module.exports = app;