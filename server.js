'user restrict'

var express = require('express')
var path = require('path')
var historyApiFallback = require('connect-history-api-fallback');

var app = express()

// HTML5 Fallback history
app.use(historyApiFallback());
app.use(express.static('public'));


var server = app.listen(8080, function(){
  var address = server.address();
  console.log(`server is running at ${address.address}:${address.port}`);
});
