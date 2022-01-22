const express = require('express');   
const app = express();  // we have a handle to the application
app.get("/",function (req,res){

    res.send("hello all")
} )
app.listen(3000, function () {
console.log('App started on port 3000');
});
