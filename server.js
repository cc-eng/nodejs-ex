//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',

app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  res.render('index.html', { pageCountMessage : null});

});

app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  res.send('{ pageCount: -1 }');

});

app.get('/vlinktest', function (req, res) {
    res.send('VLINK GET');
});

app.post('/vlinktest', function (req, res) {
    console.log('POST IP addr:\n' + req.ip);
    res.send('ACK');
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
