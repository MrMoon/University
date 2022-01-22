const express = require('express');   
const app = express();  // we have a handle to the application

//to set pug 
app.set('view engine', 'pug'); 
app.set('views', `${__dirname}/../views`);
//to run page
app.get('/first_template', function(req, res){
    res.send("test"); 
    console.log("test");   
res.render('first_view');
console.log("test3"); 
 });
 app.listen(3000);