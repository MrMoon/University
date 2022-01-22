var express = require('express');
var app = express();
app.set('view engine', 'pug'); 
app.set('views', `${__dirname}/../views`);

app.get('/dynamic_view', function(req, res){
    res.render('cond_pug',{
        user: {name:"", age: "20"}
     });
    
});

app.listen(3000);