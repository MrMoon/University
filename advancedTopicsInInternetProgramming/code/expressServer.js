const express = require('express');   
const app = express();  // we have a handle to the application
app.use(express.static('public'));

app.listen(3000, function () {
console.log('App started hello on port 3000');
});
