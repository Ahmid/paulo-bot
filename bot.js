var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

const TeleBot = require('telebot');
const bot = new TeleBot('372091526:AAHdKP9UQsi8FTBqsmJ0P2hX4BdnkUTIEG0');

var quotes = [];

url = 'https://www.goodreads.com/author/quotes/566.Paulo_Coelho?page=1';
request(url, function(error, response, html) {
    if(!error) {
        var $ = cheerio.load(html);

        $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

            var data = $(this).first().contents().filter (function () {
                 return this.type === 'text';
            }).text().replace(/[^a-zA-Z ]/g, "").trim();

            quotes.push(data + ".");
        });
    }
});

bot.on('text', msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let reply = msg.message_id;

    return bot.sendMessage(fromId, "Today's quote: " + quotes[2], { reply });
});
bot.connect();

app.listen('3005')
exports = module.exports = app;