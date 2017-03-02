var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
//var server_port = process.env.NODE || process.env.OPENSHIFT_NODEJS_PORT || 8080
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var PORT = process.env.PORT || 3005;

const TeleBot = require('telebot');
const bot = new TeleBot('305749132:AAF7gJgtnYp4lV4K1cRZ4ANv5eA6xe3rHjs');

var PauloQuotes = [];
var KafkaQuotes = [];
var OscarQuotes = [];
var EiensteinQuotes = [];
var GhandiQuotes = [];
var MarkQuotes = [];
var NietzscheQuotes = [];

var date = new Date();
var month = date.getMonth();
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
        else if (writer === 'ghandi')
            FillGhandiArray (newDate.getUTCMonth());
        else if (writer === 'mark')
            FillMarkArray (newDate.getUTCMonth());
        else if (writer === 'nietzsche')
            FillNietzscheArray (newDate.getUTCMonth());
        month = newDate.getUTCMonth();
    }

    var newDay = newDate.getDate();
    if (newDay === 31) {
        day = 0;
    }
    else {
        day = newDay;
    }
}

function FillGhandiArray (page) {
    url = 'https://www.goodreads.com/author/quotes/5810891.Mahatma_Gandhi?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace('―',"").trim();

                if (data.charAt(data.length - 1) == ',') {
                    data = data.substr(0, data.length - 1);
                }
                data.trim();

                GhandiQuotes.push(data);
            });
        }
    });
}

function FillEiensteinArray (page) {
    url = 'https://www.goodreads.com/author/quotes/9810.Albert_Einstein?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace('―',"").trim();
                
                if (data.charAt(data.length - 1) == ',') {
                    data = data.substr(0, data.length - 1);
                }
                data.trim();

                EiensteinQuotes.push(data);
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
                }).text().replace('―',"").trim();

                if (data.charAt(data.length - 1) == ',') {
                    data = data.substr(0, data.length - 1);
                }
                data.trim();
                PauloQuotes.push(data);
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
                }).text().replace('―',"").trim();

                if (data.charAt(data.length - 1) == ',') {
                    data = data.substr(0, data.length - 1);
                }
                data.trim();

                OscarQuotes.push(data);
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
                }).text().replace('―',"").trim();

                if (data.charAt(data.length - 1) == ',') {
                    data = data.substr(0, data.length - 1);
                }
                data.trim();

                KafkaQuotes.push(data);
            });
        }
    });
}

function FillMarkArray (page) {
    url = 'https://www.goodreads.com/author/quotes/1244.Mark_Twain?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace('―',"").trim();

                if (data.charAt(data.length - 1) == ',') {
                    data = data.substr(0, data.length - 1);
                }
                data.trim();

                MarkQuotes.push(data);
            });
        }
    });
}

function FillNietzscheArray (page) {
    url = 'https://www.goodreads.com/author/quotes/1938.Friedrich_Nietzsche?page=' + page;
    request(url, function(error, response, html) {
        if(!error) {
            var $ = cheerio.load(html);

            $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

                var data = $(this).first().contents().filter (function () {
                    return this.type === 'text';
                }).text().replace('―',"").trim();

                if (data.charAt(data.length - 1) == ',') {
                    data = data.substr(0, data.length - 1);
                }
                data.trim();

                NietzscheQuotes.push(data);
            });
        }
    });
}

bot.on(['audio','voice','photo'], msg => {
    let fromId = msg.from.id;

    return bot.sendMessage(fromId, "Type / followed by writer's name to get the daily quote!" + 
    "\n\nList of available writers:\n-/Paulo\n-/Kafka\n-/OscarWilde\n-/Einstein\n-/Gandhi\n-/Mark");
});

bot.on('/start', msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let username = msg.from.username;
    let lastName = msg.from.last_name;

    if (firstName) {
        return bot.sendMessage(fromId, "Hello " + firstName + "! 😊\nHope you will enjoy the daily quotes!\n\n" +
        "Type /list to list available writers.");
        console.log (firstName + " " + lastName + " joined!");
    }
    else if (username) {
        return bot.sendMessage(fromId, "Hello " + username + "! 😊\nHope you will enjoy the daily quotes!\n\n"+
        "Type /list to list available writers.");
        console.log (username + " joined!");
    }
    else {
        return bot.sendMessage(fromId, "Hello 😊\nHope you will enjoy the daily quotes!\n\n"+
        "Type /list to list available writers.");
        console.log ("Anonymous joined!" );
    }

   
});

bot.on('/list', msg => {
    let fromId = msg.from.id;

    return bot.sendMessage(fromId, "List of available writers:\n\n-/Paulo\n-/Kafka\n-/Oscar\n-/Einstein\n-/Ghandi"+
    "\n-/Mark\n-/Nietzsche");
});

bot.on(['/paulo','/Paulo','/PAULO'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('paulo');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked paulo");

    return bot.sendMessage(fromId, "🍂Today's Paulo quote:🍂\n\n" + PauloQuotes[day]);
});

bot.on(['/kafka','/Kafka','/KAFKA'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('kafka');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked kafka");
    return bot.sendMessage(fromId, "🍂Today's Kafka quote:🍂\n\n" + KafkaQuotes[day]);
});

bot.on(['/Einstein','/einstein','/EINSTEIN'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('einstein');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked einstien");
    return bot.sendMessage(fromId, "🍂Today's Einstein quote:🍂\n\n" + EiensteinQuotes[day]);
});

bot.on(['/Ghandi','/ghandi','/GHANDI'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('ghandi');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked Ghandi");
    return bot.sendMessage(fromId, "🍂Today's Ghandi quote:🍂\n\n" + GhandiQuotes[day]);
});

bot.on(['/oscar','/Oscar','/oscarWilde','/OSCARWILDE'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('oscar');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked oscar");
    return bot.sendMessage(fromId, "🍂Today's Oscar quote:🍂\n\n" + OscarQuotes[day]);
});

bot.on(['/mark','/Mark','/MARK'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('mark');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked Mark");
    return bot.sendMessage(fromId, "🍂Today's Mark quote:🍂\n\n" + MarkQuotes[day]);
});

bot.on(['/nietzsche','/Nietzsche','/NIETZSCHE'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('nietzsche');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked Nietzsche");
    return bot.sendMessage(fromId, "🍂Today's Nietzsche quote:🍂\n\n" + NietzscheQuotes[day]);
});

bot.on ('inlineQuery', msg => {
    let query = msg.query;
    console.log ('Inline Query: ' + query);
    var reply;
    const answers = bot.answerList(msg.id, { cacheTime: 60 });
    query.toLowerCase();

    if (query) {
        if (query === 'paulo') {
            checkDates('paulo');
            reply = "🍂Today's Paulo quote:🍂\n\n" + PauloQuotes[day];
        }
        else if (query === 'einstein') {
            checkDates('einstein');
            reply = "🍂Today's Einstein quote:🍂\n\n" + EiensteinQuotes[day];
        }
        else if (query === 'kafka') {
            checkDates('kafka');
            reply = "🍂Today's Kafka quote:🍂\n\n" + KafkaQuotes[day];
        }
        else if (query === 'ghandi') {
            checkDates('ghandi');
            reply = "🍂Today's Ghandi quote:🍂\n\n" + GhandiQuotes[day];
        }
        else if (query === 'oscar') {
            checkDates('oscar');
            reply = "🍂Today's Oscar quote:🍂\n\n" + OscarQuotes[day];
        }
        else if (query === 'nietzsche') {
            checkDates('nietzsche');
            reply = "🍂Today's Nietzsche quote:🍂\n\n" + NietzscheQuotes[day];
        }
        else if (query === 'mark') {
            checkDates('mark');
            reply = "🍂Today's Mark quote:🍂\n\n" + MarkQuotes[day];
        }
        
        if (reply) {
            answers.addArticle({
                id: 'query',
                title: 'Quote of the day:',
                description: `Your query: ${ query }`,
                message_text: reply
            });

            return bot.answerQuery(answers);
        }
    }
});

FillPauloArray(month);
FillKafkaArray(month);
FillOscarArray(month);
FillEiensteinArray(month);
FillGhandiArray(month);
FillMarkArray(month);
FillNietzscheArray(month);
bot.connect();
app.listen(PORT);
exports = module.exports = app;