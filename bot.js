var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var sentiment = require('sentiment');
var WordPOS = require('wordpos');
var _ = require ('underscore');
var unirest = require('unirest');
var app     = express();
//var server_port = process.env.NODE || process.env.OPENSHIFT_NODEJS_PORT || 8080
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var PORT = process.env.PORT || 3005;

const TeleBot = require('telebot');
const bot = new TeleBot('305749132:AAF7gJgtnYp4lV4K1cRZ4ANv5eA6xe3rHjs');
const authKey = "EnwH9yMqnDmshjBGYeGRdRW5NJf8p1CVCy6jsngiXenHl1PL5W";

var PauloQuotes = [];
var KafkaQuotes = [];
var OscarQuotes = [];
var EiensteinQuotes = [];
var GhandiQuotes = [];
var MarkQuotes = [];
var NietzscheQuotes = [];
var GabrielQuotes = [];
var MahmoudDQuotes = [];
var NizarQuotes = [];

var wordpos = new WordPOS();
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
        else if (writer === 'gabriel')
            FillGabrielArray (newDate.getUTCMonth());
        else if (writer === 'mahmoud')
            FillMahmoudDArray (newDate.getUTCMonth());
        else if (writer === "nizar")
            FillNizarArray (newDate.getUTCMonth());
        month = newDate.getUTCMonth();
    }

    var newDay = newDate.getDate();
    if (newDay === 31 || newDay === 30) {
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

function FillGabrielArray (page) {
    url = 'https://www.goodreads.com/author/quotes/13450.Gabriel_Garc_a_M_rquez?page=' + page;
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

                GabrielQuotes.push(data);
            });
        }
    });
}

function FillMahmoudDArray (page) {
    url = 'https://www.goodreads.com/author/quotes/75055.Mahmoud_Darwish?page=' + page;
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

                MahmoudDQuotes.push(data);
            });
        }
    });
}

function FillNizarArray (page) {
    url = 'https://www.goodreads.com/author/quotes/850723._?page=' + page;
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

                NizarQuotes.push(data);
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
    "\n-/Mark\n-/Nietzsche\n-/Gabriel\n-/Mahmoud\n-/Nizar");
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

bot.on(['/Gabriel','/gabriel','/GABRIEL'], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('gabriel');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked Gabriel");
    return bot.sendMessage(fromId, "🍂Today's Gabriel quote:🍂\n\n" + GabrielQuotes[day]);
});

bot.on(['/Mahmoud','/mahmoud','/MAHMOUD',], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('mahmodD');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked Mahmoud Darwish");
    return bot.sendMessage(fromId, "🍂Today's Mahmoud Dawrish's quote:🍂\n\n" + MahmoudDQuotes[day]);
});

bot.on(['/Nizar','/nizar','/NIZAR',], msg => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let lastName = msg.from.last_name;

    checkDates('nizar');
    console.log (new Date() + ": " + firstName + " " + lastName + " checked Nizar");
    return bot.sendMessage(fromId, "🍂Today's Nizar Qabbani's quote:🍂\n\n" + NizarQuotes[day]);
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
        else if (query === 'gabriel') {
            checkDates('gabriel');
            reply = "🍂Today's Gabriel quote:🍂\n\n" + GabrielQuotes[day];
        }
        else if (query === 'mahmoud') {
            checkDates('mahmoud');
            reply = "🍂Today's Mahmoud Darwish quote:🍂\n\n" + MahmoudDQuotes[day];
        }
        else if (query === 'nizar') {
            checkDates('mahmoud');
            reply = "🍂Today's Nizar Qabbani's quote:🍂\n\n" + NizarQuotes[day];
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

function removeI (sentence) {

    for (var i=sentence.length-1; i>=0; i--) {
        if (sentence[i] === 'I') {
            sentence.splice(i, 1);
        }
    }
    return sentence;
}

// bot.on('text', msg => {
//     let txt = msg.text;
//     let firstName = msg.from.first_name;
//     let lastName = msg.from.last_name;

//     console.log (new Date() + ": " + firstName + " " + lastName + " mood: " + txt);
//     wordpos.getAdjectives(txt, function (result) {
//         var userAdj=result;
//         if (userAdj.length == 0) {
//             bot.sendMessage(msg.from.id, "Can not detect your mood, please try again using different words.");
//             return;
//         }
//         else {
//             var sent = sentiment(txt);
//             var random = Math.round(Math.random() * (8 - 1) + 1);
//             var found = false;
//             userAdj = removeI(userAdj);

//             if(sent.score != 0) {
//                     //check if user is negative, search for positive quote and send it!
//                     if (sent.score < 0) { 
//                         url = "https://wordsapiv1.p.mashape.com/words/" + userAdj[0] + "/antonyms";
//                            unirest.get(url)
//                            .header("X-Mashape-Key", authKey)
//                            .header("Accept", "application/json")
//                            .end(function (result) {
         
//                                 console.log(result.body.antonyms);
//                                 var quoteAdj = result.body.antonyms;

//                                 for (var i=0; i<PauloQuotes.length;i++)
//                                 {   
//                                     var Qsent = sentiment (PauloQuotes[i]);
//                                     if (Qsent.score >= 2) {
//                                         found = true;
//                                         bot.sendMessage(msg.from.id, "☀Paulo Coelho: \n\n" + PauloQuotes[i]);
//                                         return;
//                                     }
//                                 }
//                             });
//                             if (found) {
//                                 return;
//                             }
//                     }
//                     //user is positive, search for similar adjectives in a quote and send it!
//                     else {
//                         var found = false;
//                         var counter = 0;
//                         while (!found) {
//                             var page = Math.round(Math.random() * (100 - 1) + 1);
//                             var url = 'http://www.goodreads.com/quotes/tag/inspirational?page=' + page;
//                             if (counter == 6) {
//                                 break;
//                             }
//                             request(url, function(error, response, html) {
//                                 if(!error) {
//                                     var $ = cheerio.load(html);
//                                     $('.quotes .quote .quoteDetails .quoteText').each (function (i, elm) {

//                                         var data = $(this).first().contents().filter (function () {
//                                             return this.type === 'text';
//                                         }).text().replace('―',"").trim();

//                                         if (data.charAt(data.length - 1) == ',') {
//                                             data = data.substr(0, data.length - 1);
//                                         }
//                                         data.trim();
//                                         console.log(data);
//                                         //check if the quote contains user adjectives
//                                         quoteAdj = data.split(' ');
//                                         console.log (quoteAdj);
//                                         if (_.intersection(userAdj, quoteAdj).length > 0) {
//                                             bot.sendMessage(msg.from.id, "☀" + data);
//                                             found = true;
//                                             return;
//                                         }
//                                     });
//                                     counter++;
//                                 }
//                             });
//                         }
//                         if (!found) {
//                             bot.sendMessage(msg.from.id, "Try another mood!");
//                         }
//                     }
//             }
//             else {
//                 bot.sendMessage(msg.from.id, "Can not detect your mood, please try again using different words.");
//                 return;
//             }
//         }//end else
//     });
// });



FillPauloArray(month);
FillKafkaArray(month);
FillOscarArray(month);
FillEiensteinArray(month);
FillGhandiArray(month);
FillMarkArray(month);
FillNietzscheArray(month);
FillGabrielArray(month);
FillMahmoudDArray(month);
FillNizarArray(month);
bot.connect();
app.listen(PORT);
exports = module.exports = app;