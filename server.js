var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var api = require('./api');

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
});

// Zillow API Key
var _Z_API_KEY = fs.readFileSync('.zapi').toString().replace(/\n$/, '');

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.htm");
});

app.post('/', function(req, res) {
  console.log("Post to index");
});

// Lookup by city/county/state
app.post('/lookup', function(req, res) {
  console.log("Loading locations...");

  if(!req.body) console.log("No body");

  return(api.getRegionChildren(_Z_API_KEY, "test").then(function(response) {
    console.log(JSON.stringify(response));
  },
  function(error) {
    console.log("Err1 = " + error);
  }));
});