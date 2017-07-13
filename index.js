'use strict';

var Alexa = require("alexa-sdk");
var dictionary = require("utils/dictionary.js");
var translator = require("utils/translator.js");
var ALEXA_CREDS = require("credentials/alexa.json");

function sendErrorResponse(error) {
    this.emit(':tell', 'There was an error looking up this word:', error);
};

function sendResponse(origWord, translation) {
    if (origWord) {
        this.attributes['speechOutput'] = origWord;
        this.emit(':tell', 'the word for ' + origWord + ' is ' + translation + 
            ' spelled <say-as interpret-as="spell-out">' + translation + '</say-as>'
        );
    } else {
        if (origWord) {
            this.emit(':tell', 'Sorry, I don\'t know the word for ' + origWord);
        } else {
            this.emit(':tell', 'Sorry, I didn\'t hear the word you were asking for.');
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = ALEXA_CREDS.application_id;
    alexa.registerHandlers(handlers);
    alexa.execute();
    context.done();
    callback(null, "success");
};

var handlers = {
    'Unhandled': function() {
        this.emit(':tell', 'I don\'t know how to handle this request');
    },
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'SayHello': function () {
        this.emit(':tell', 'Hello World!');
  },
  'GetWordIntent': function () {
    var itemSlot = this.event.request.intent.slots.Word;
    var itemName;
    if (itemSlot && itemSlot.value) {
        itemName = itemSlot.value.toLowerCase();
        console.log('word heard:', itemName);
    }
    
    translator.fetchTranslation(itemName, function(err, translation) {
        console.log('fetch returned value:', translation);
        if (err) {
            sendErrorResponse(err);
        }
        sendResponse(itemName, translation);
    });
  }
};



// var word = dictionary[itemName];
// if (word) {
//     this.attributes['speechOutput'] = word;
//     // this.emit(':tell', 'the word for ' + itemName + ' is ' + word);
//     this.emit(':tell', 'the word for ' + itemName +
//         ' is ' + word.phonetic +
//         ' spelled <say-as interpret-as="spell-out">' + word.word + '</say-as>'
//     );
// } else {
//   if (itemName) {
//     this.emit(':tell', 'Sorry, I don\'t know the word for ' + itemName);
//   } else {
//       this.emit(':tell', 'Sorry, I didn\'t hear the word you were asking for.');
//   }
// }


// console.log('Loading event');
// var AWS = require('aws-sdk');
// var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
//
// exports.handler = function(event, context) {
// console.log(JSON.stringify(event, null, '  '));
// dynamodb.listTables(function(err, data) {
//   console.log(JSON.stringify(data, null, '  '));
// });
// var tableName = "clients";
// var datetime = new Date().getTime().toString();
// dynamodb.getItem({
//     TableName: tableName,
//     Key: {
//         ClientID: { S: "gr5f4sgnca25hki" } }
//
// }, function(err, data) {
//     if (err) {
//         context.done('error','putting item into dynamodb failed: '+err);
//     }
//     else {
//         context.done(data);
//     }
// });
// };


// var Alexa = require('alexa-sdk');
//
// var handlers = {
//     'GetWordIntent': function () {
//         this.emit(':tell', 'Hello World!');
//     }
// };
//
// exports.handler = function(event, context, callback){
//     var alexa = Alexa.handler(event, context);
//
//     alexa.registerHandlers(handlers);
//     alexa.execute();
// };
