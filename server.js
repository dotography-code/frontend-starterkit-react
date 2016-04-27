'user restrict'

var express = require('express')
var path = require('path')

var app = express()

app.use(express.static('app/dist'));

// HTML5 Fallback history
app.use(function (req, res, next) {
  if (req.accepts('html')) res.sendFile(path.resolve(__dirname, 'app/dist/index.html'))
  else next()
})

var server = app.listen(8080, function(){
  var address = server.address();
  console.log(`server is running at ${address.address}:${address.port}`);
});
