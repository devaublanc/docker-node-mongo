var express = require('express');
var app = express();
var mongoose = require('mongoose');

//DB setup
// mongoose.connect("mongodb://mongo:27017/test");
mongoose.connect("mongodb://localhost:27017/test");


const Fruit = mongoose.model('Fruit', { name: String });

app.get('/', function(req, res){    
    res.send("Hello World-changed-2");
});

app.get('/list', function(req, res){    
    Fruit.find({},{}, function(e, docs){
        console.log(docs)
        res.send(docs);
    });
    
});

app.get('/add', function(req, res){
    const pomme = new Fruit({ name: 'Pomme' });
    pomme.save().then(() => res.send('Pomme saved'));
});


app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});