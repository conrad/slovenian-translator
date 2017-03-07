'use strict';
var Alexa = require("alexa-sdk");
var dictionary = require("dictionary.js");

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

        var word = dictionary[itemName];

        if (word) {
            this.attributes['speechOutput'] = word;
            this.emit(':tell', word);
        } else {
          this.emit(':tell', 'Sorry, I don\'t know that one. This is what I got ' + itemName);
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
