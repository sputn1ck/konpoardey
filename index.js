'use strict';

var Alexa = require('alexa-sdk');
var disses = require('./disses');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event,context)
    alexa.registerHandlers(handlers);
}


var handlers = {

    'SpruchIntent': function() {
        this.emit(':tell', getRandomDiss())
    },
    'RegisterIntent': function() {
        var name = this.event.request.intent.slots.name.value
        registerUser(name)
        this.emit(':tell', name +  ' ist auf der party angekommen');
    },
    'DeRegisterIntent': function() {
        this.emit(':tell', 'von meiner party flieht niemand');
    },
    'ListNamesIntent': function() {
        this.emit(':tell', users.join(" ,"))
    },
    'RandomNameIntent': function() {
        this.emit(':tell', users[getRandomInt(0, users.length - 1)])
    }
    

}

function registerUser(name) {
    users.push(name);
}

function getRandomDiss() {
    return disses[getRandomInt(0, disses.length - 1)]
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var users = ["Kon", "Finn", "Robin"]

var disses = [
    "Körper wo",
    "Abbruch",
    "Mafia vor dem Herren",
    "Leck mich am Tisch",
    "Ripper Abbruch",
    "Fischer Abbruch",
    "Da hat sich der Ripper mal wieder mit dem Hammer geföhnt"
]