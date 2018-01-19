var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));

app.listen(app.get('port'), function(req, res) {
  console.log('Node Clock up and running');
})
