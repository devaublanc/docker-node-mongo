var express = require('express');
var app = express();
var mongoose = require('mongoose');

const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development'

//DB setup
const mongoHost = nodeEnv === 'production' ? 'mongodb://mongo:27017/test' : 'mongodb://localhost:27017/test'
mongoose.connect(mongoHost);

const Fruit = mongoose.model('Fruit', { name: String });

app.get('/', function(req, res){    
  res.send('Hello World (env=' + nodeEnv + ')');
});

app.get('/list', function(req, res){    
  Fruit.find({},{}, function(e, docs){
    res.send(docs);
  });    
});

app.get('/add', function(req, res){
  const pomme = new Fruit({ name: 'Pomme' });
  pomme.save().then(() => res.send('Pomme saved'));
});


app.listen(3000, function(){
  console.log('Example app listening on port 3000 ! ');
});