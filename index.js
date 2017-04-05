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
        this.emit(':tell', dissBuilder());
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
        this.emit(':tell', guests.join(" ,"));
    },
    'RandomNameIntent': function() {
        this.emit(':tell', getRandomName());
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


/*
*   returns 4 unique players for a game of beerpong
*   always returns 4 fresh players unless slots cannot be filled
*   
*/
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


//gets n unique items from array n
function getRandom(arr, n) {
    
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
  if(arr.length === n ){
      result = arr.splice(0)
      shuffle(result)
      return result;
    }
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

//Guest Construct
var guests = ["Kon", "Jan", "Ripper"];

//Beerpong Player construct
var players = ["Kon", "Jan", "Ripper", "Robin", "Finn", "Fabian"];
var recentPlayers = []


//return Action based on Drinking games
var aceDrawn = 0;
function getRandomCard() {
    var card = Math.floor(Math.random() * (14 - 5 + 1 ) + 5);
    if (card <= 10 && card % 2 === 0) 
        return "Trinke "+ card + " Schlücke";
    else if(card <= 10 && card % 2 === 1)
        return "Verteile " + card + " Schlücke";
    else if(card == 11)
        return getRandom(guests, 1);
    else if(card == 12)
        return "Alle Frauen Trinken"
    else if(card == 13)
        return "Alle Männer Trinken"
    else if(card == 14) {
        aceDrawn++;
        if(aceDrawn === 4) {
            aceDrawn = 0;
            return "Das war das vierte Ass. Trinke einen Shot du dumme Sau";
        } else {
            return "Das war Ass nummer " + aceDrawn + "."
        }
    }
        
        
}



var namedDisses = [
    "Leck mich am Tisch",
    "%NAME% abbruch",
    "Da hat sich %NAME% mal wieder mit dem Hammer geföhnt",
    "%NAME% ist eine dumme sau"
];
//returns personalized disses
function dissBuilder() {

    var replacements = {"%NAME%" : getRandomName()},
        str = namedDisses[getRandomInt(0, namedDisses.length - 1)];
    str = str.replace(/%\w+%/g, function(all) {
    return replacements[all] || all;
    });
    return str
}


function getRandomName() {
    return guests[getRandomInt(0, guests.length - 1)];
}

function registerUser(name) {
    guests.push(name);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



