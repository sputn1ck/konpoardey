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
    'Unhandled': function() {
        console.log("UNHANDLED");
        this.emit(':tell', 'wat?');
    }
    

};

function getBeerPongMatch() {
    var s = getRandom(users, 4);
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
var disses = [
    "Leck mich am Tisch",
    "Ripper Abbruch",
    "Fischer Abbruch",
    "Da hat sich der Ripper mal wieder mit dem Hammer geföhnt"
];