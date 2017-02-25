var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var PORT = process.env.PORT || 3005;

const TeleBot = require('telebot');
const bot = new TeleBot('305749132:AAF7gJgtnYp4lV4K1cRZ4ANv5eA6xe3rHjs');

var PauloQuotes = [];
var KafkaQuotes = [];
var OscarQuotes = [];
var EiensteinQuotes = [];
var date = new Date();
var month = date.getUTCMonth();
var day;


function checkDates (writer) {
    var newDate = new Date();
    if (newDate.getUTCMonth() > month) {
        if (writer === 'paulo')
            FillPauloArray (newDate.getUTCMonth());
        else if (writer === 'kafka')
            FillKafkaArray (newDate.getUTCMonth());
        else if (writer === 'oscar')
            FillOscarArray (newDate.getUTCMonth());
        else if (writer === 'einstein')
            FillEiensteinArray (newDate.getUTCMonth());
        month = newDate.getUTCMonth();
    }

    var newDay = date.getUTCDate();
    if (newDay === 31) {
        day = 0;
    }
    else {
        day = newDay;
    }
}

function FillEiensteinArray (page) {
    url = 'https://www.goodreads.com/author/quotes/9810.Albert_Einstein?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace(/[^a-zA-Z ]/g, "").trim();

                EiensteinQuotes.push(data + ".");
            });
        }
    });
}

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

function FillOscarArray (page) {
    url = 'https://www.goodreads.com/author/quotes/3565.Oscar_Wilde?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace(/[^a-zA-Z ]/g, "").trim();

                OscarQuotes.push(data + ".");
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

bot.on(['audio','voice','photo'], msg => {
    let fromId = msg.from.id;

    return bot.sendMessage(fromId, "Type / followed by writer's name to get the daily quote!" + 
    "\n\nList of available writers:\n-/Paulo\n-/Kafka\n-/OscarWilde\n-/Einstein");
});

bot.on('/start', msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let username = msg.username;

    if (firstName) {
        return bot.sendMessage(fromId, "Hello " + firstName + "! 😊\nHope you will enjoy the daily quotes!\n\n" +
        "Type /list to list available writers.");
    }
    else if (username) {
        return bot.sendMessage(fromId, "Hello " + username + "! 😊\nHope you will enjoy the daily quotes!\n\n"+
        "Type /list to list available writers.");
    }
    else {
        return bot.sendMessage(fromId, "Hello 😊\nHope you will enjoy the daily quotes!\n\n"+
        "Type /list to list available writers.");
    }

   
});

bot.on('/list', msg => {
    let fromId = msg.from.id;

    return bot.sendMessage(fromId, "List of available writers:\n\n-/Paulo\n-/Kafka\n-/OscarWilde\n-/Einstein");
});

bot.on(['/paulo','/Paulo','/PAULO'], msg => {
    let fromId = msg.from.id;

    checkDates('paulo');
    return bot.sendMessage(fromId, "🍂Today's Paulo quote:🍂\n\n" + PauloQuotes[day]);
});

bot.on(['/kafka','/Kafka','KAFKA'], msg => {
    let fromId = msg.from.id;

    checkDates('kafka');
    return bot.sendMessage(fromId, "🍂Today's Kafka quote:🍂\n\n" + KafkaQuotes[day]);
});

bot.on(['/Einstein','/einstein','EINSTEIN'], msg => {
    let fromId = msg.from.id;

    checkDates('einstein');
    return bot.sendMessage(fromId, "🍂Today's Einstein quote:🍂\n\n" + EiensteinQuotes[day]);
});

bot.on(['/oscar','/Oscar','oscarWilde','OSCARWILDE'], msg => {
    let fromId = msg.from.id;

    checkDates('oscar');
    return bot.sendMessage(fromId, "🍂Today's Oscar quote:🍂\n\n" + OscarQuotes[day]);
});

bot.connect();

FillPauloArray(month);
FillKafkaArray(month);
FillOscarArray(month);
FillEiensteinArray(month);
app.listen(PORT)
exports = module.exports = app;