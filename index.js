'use strict';

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event,context)
    alexa.registerHandlers(handlers);
    alexa.execute();
}


var handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', 'Mafia vor dem Herren');
    },
    'SpruchIntent': function() {
        this.emit(':tell', getRandomDiss());
    },
    'RegisterIntent': function() {
        var name = this.event.request.intent.slots.Name.value;
        registerUser(name);
        this.emit(':tell', name +  ' ist auf der party angekommen');
    },
    'DeRegisterIntent': function() {
        var name = this.event.request.intent.slots.Name.value;
        this.emit(':tell', 'von meiner party flieht niemand');
    },
    'ListNamesIntent': function() {
        this.emit(':tell', users.join(" ,"));
    },
    'RandomNameIntent': function() {
        this.emit(':tell', users[getRandomInt(0, users.length - 1)]);
    },
    'BeerPongIntent': function() {
        this.emit(':tell', getBeerPongMatch());
    },
    'RandomCardIntent': function() {
        this.emit(':tell', getRandomCard());
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        this.emit(':tell', 'wat?');
    }
    

};

function getBeerPongMatch() {
    var eligblePlayers = players.slice(0);
  
    recentPlayers.forEach(function(element) {
    var index = eligblePlayers.indexOf(element)
    if (index > -1) {
       eligblePlayers.splice(index, 1);
    }
    });
    if(eligblePlayers.length < 4) {
      var n = 4-eligblePlayers.length;
      eligblePlayers = eligblePlayers.concat(getRandom(recentPlayers, n))
      recentPlayers = [];
    }
    var s = getRandom(eligblePlayers, 4);
    recentPlayers = recentPlayers.concat(s);
    
    return "" + s[0] + " und " + s[1] + " spielen gegen "+ s[2] + " und " + s[3];
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function registerUser(name) {
    users.push(name);
}


function getRandomDiss() {
    return disses[getRandomInt(0, disses.length - 1)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var users = ["Kon", "Jan", "Ripper"];
var players = ["Kon", "Jan", "Ripper", "Robin", "Finn", "Fabian"];
var recentPlayers = []
var disses = [
    "Leck mich am Tisch",
    "Ripper Abbruch",
    "Fischer Abbruch",
    "Da hat sich der Ripper mal wieder mit dem Hammer geföhnt"
];
var assesDrawn = 0;
function getRandomCard() {
    var card = Math.floor(Math.random() * (14 - 5 + 1 ) + 5);
    if (card <= 10 && card % 2 === 0) 
        return "Trinke "+ card + " Schlücke";
    else if(card <= 10 && card % 2 === 1)
        return "Verteile " + card + " Schlücke";
    else if(card == 11)
        return getRandom(users, 1);
    else if(card == 12)
        return "Alle Frauen Trinken"
    else if(card == 13)
        return "Alle Männer Trinken"
    else if(card == 14) {
        assesDrawn++;
        if(assesDrawn === 4) {
            assesDrawn = 0;
            return "Das war das vierte Ass. Trinken einen Shot du dumme Sau";
        } else {
            return "Das war Ass nummer " + assesDrawn + "."
        }
    }
        
        
}
