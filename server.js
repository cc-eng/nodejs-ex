//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    bodyParser = require('body-parser');

let dg = require('debug')('node-ex:get');    
let dp = require('debug')('node-ex:post');    
dg.enabled = true;
dp.enabled = true;
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));
// app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.raw());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

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
    dg('VLINK GET');
    res.send('ACK');
});

app.post('/vlinktest', function (req, res) {
    let foo = ''
    if(req.body.length > 5)
    {
      num = req.body.slice(0,4);
      num.map(x => {foo += ' 0x' + x.toString(16)}).join(' ');
    }
    dp('POST IP addr:' + req.ip + ' body length:' + req.body.length + ' data:' + foo);
    dp('POST IP header: ' + JSON.stringify(req.headers, undefined, 2));
    res.send('ACK');
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
