var express = require('express');
var app = express();
app.set('view engine', 'pug'); 
app.set('views', `${__dirname}/../views`);

app.get('/dynamic_view', function(req, res){
   res.render('dynamic_pug', {
      name: "psut", 
      url:"http://www.psut.com"
   });
});

app.listen(3000);