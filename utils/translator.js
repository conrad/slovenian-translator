'use strict'

const Translate = require('@google-cloud/translate');
const GOOGLE_APPLICATION_CREDENTIALS = require('../credentials/google-translate.json')
const targetLanguage = 'sl';

module.exports = {
  fetchTranslation : function(phrase, cb) {
    console.log('start fetchTransaltion()');
    const translateClient = Translate({
      projectId: GOOGLE_APPLICATION_CREDENTIALS.project_id
    });

    console.log('translate client instantiated');
    translateClient.translate(phrase, targetLanguage)
    .then((results) => {
      console.log('Received result from GTranslate');
      const translation = results[0];
      // const translation = results.data.translations[0].translatedText; 

      console.log(`Text: ${phrase}`);
      console.log(`Translation: ${translation}`);

      cb(null, translation);
    })
    .catch((err) => {
     console.error('ERROR:', err);
     cb(err);
    });
  }
};



// var unirest = require('unirest');

//     unirest.post('http://mockbin.com/request')
//     .headers({
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': ...
//     })
//     .send({
//       "parameter": 23, "foo": "bar"
//     })
//     .end(function (response) {
//       console.log(response.body);
//       return parseTranslateJson(response.body);
//     });
//   }
// };
//
// function getRequestJson(phrase) {
//   return {
//     'q': phrase,
//     'source': 'en',
//     'target': 'sl',
//     'format': 'text'
//   };
//
// }
//
// function parseTranslateJson(json) {
//   return response.body.data.translations[0].translatedText;
// };

// {
//   "data": {
//     "translations": [
//       {
//         "translatedText": "dvainosemdeset"
//       }
//     ]
//   }
// }





// // We need this to build our post string
// var querystring = require('querystring');
// var http = require('http');
// var fs = require('fs');
//
// function PostCode(codestring) {
//   // Build the post string from an object
//   var post_data = querystring.stringify({
//       'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
//       'output_format': 'json',
//       'output_info': 'compiled_code',
//         'warning_level' : 'QUIET',
//         'js_code' : codestring
//   });
//
//   // An object of options to indicate where to post to
//   var post_options = {
//       host: 'closure-compiler.appspot.com',
//       port: '80',
//       path: '/compile',
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Content-Length': Buffer.byteLength(post_data)
//       }
//   };
//
//   // Set up the request
//   var post_req = http.request(post_options, function(res) {
//       res.setEncoding('utf8');
//       res.on('data', function (chunk) {
//           console.log('Response: ' + chunk);
//       });
//   });
//
//   // post the data
//   post_req.write(post_data);
//   post_req.end();
//
// }
//
// // This is an async file read
// fs.readFile('LinkedList.js', 'utf-8', function (err, data) {
//   if (err) {
//     // If this were just a small part of the application, you would
//     // want to handle this differently, maybe throwing an exception
//     // for the caller to handle. Since the file is absolutely essential
//     // to the program's functionality, we're going to exit with a fatal
//     // error instead.
//     console.log("FATAL An error occurred trying to read in the file: " + err);
//     process.exit(-2);
//   }
//   // Make sure there's data before we post it
//   if(data) {
//     PostCode(data);
//   }
//   else {
//     console.log("No data to post");
//     process.exit(-1);
//   }
// });
