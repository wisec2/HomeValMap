var fs = require('fs');

// Base Zillow request attributes
const _BASE_API = "http://www.zillow.com/webservice/";
const _Z_ZWS_ID = ".htm?zws-id=";

// Relevant Zillow API Functions
const _Z_GET_REGION_CHILDREN = "GetRegionChildren";

module.exports = {

  getRegionChildren : function(apiKey, location) {
    var requestUrl = _BASE_API + _Z_GET_REGION_CHILDREN +
                     _Z_ZWS_ID + apiKey + "&state=ma&childtype=city";

    console.log(requestUrl);
    return makeRequest(requestUrl); 
  }

}

function makeRequest(url) {
  // Grab libraries required for this function
  var parseString = require('xml2js').parseString;
  var http = require('http');
  var express = require('express');
  var app     = express();
  var bodyParser = require('body-parser');
  var Promise = require('bluebird');
  return new Promise(function(resolve, reject) {

    app.use(bodyParser.urlencoded({ extended:false }));

    if(url.toString().indexOf('https') === 0)
      http = require('https');

    var request = http.get(url, function(response) {
      var buffer = "",
          data;

      response.on('data', function(chunk) {
        buffer += chunk;
      });

      response.on('end', function(err) {
        if(err) {
          reject(err);
        }

        var parsedResult;
        var parsedXML = parseString(buffer, function(err, result) {
          if(err) reject(err);
          parsedResult = JSON.parse(JSON.stringify(result));
        });
        // console.log("makeRequest parsed result: \n" + JSON.stringify(parsedResult));
        resolve(parsedResult);
      });
    });
  });
}