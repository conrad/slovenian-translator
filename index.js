'use strict';

var Alexa = require("alexa-sdk");
var dictionary = require("utils/dictionary.js");
var translator = require("utils/translator.js");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
    context.done();
    callback(null, "success");
};

var handlers = {
  'LaunchRequest': function () {
      this.emit('SayHello');
  },
  'HelloWorldIntent': function () {
      this.emit('SayHello')
  },
  'SayHello': function () {
      this.emit(':tell', 'Hello World!');
  },
  'GetWordIntent': function () {
    var itemSlot = this.event.request.intent.slots.Word;
    var itemName;
    if (itemSlot && itemSlot.value) {
        itemName = itemSlot.value.toLowerCase();
    }

    // var word = dictionary[itemName];
    var word = translator.fetchTranslation(itemName);

    if (word) {
        this.attributes['speechOutput'] = word;
        // this.emit(':tell', 'the word for ' + itemName + ' is ' + word);
        this.emit(':tell', 'the word for ' + itemName +
            ' is ' + word.phonetic +
            ' spelled <say-as interpret-as="spell-out">' + word.word + '</say-as>'
        );
    } else {
      if (itemName) {
        this.emit(':tell', 'Sorry, I don\'t know the word for ' + itemName);
      } else {
          this.emit(':tell', 'Sorry, I didn\'t hear the word you were asking for.');
      }
    }
  }
};


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
