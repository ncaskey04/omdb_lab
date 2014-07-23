
var express = require('express'),
    request = require('request'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    app = express();

var watchLater = [];
var favorites = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get('/', function (req,res) {
  res.render('index.ejs');
});


app.get('/search', function (req,res) {
  var query = req.query.searchTerm;
  var url = 'http://www.omdbapi.com/?s=' + query;
  request(url, function (error,response,body) { 
    if (!error) {
      var data = JSON.parse(body); 
      res.render('results.ejs', {movieList : data.Search || [] });
    }
  });
});


app.get('/details/:id', function (req,res) {
  var query = req.params.id;
  var url = 'http://www.omdbapi.com/?i=' + query;
  request(url, function (error,response,body){
    if(!error){
      var data = JSON.parse(body);
      res.render('details.ejs', {movie: data} || [] );
    }
  });
});


app.get('/watchLater', function (req,res) {

});

/* app.post('/favorites', function (req,res){
  var title = req.body.Title;
  var id = req.body.ID;
  var obj = {title: title, id: id}
  console.log(req.body.Title);
  console.log(favorits);
  res.redirect("/favorites");
  });

  app.get('/favorites', function(req,res){
  
  });

 */


app.listen(3000, function(){
  console.log('-----SERVER STARTED ON localhost:3000-----');
});

