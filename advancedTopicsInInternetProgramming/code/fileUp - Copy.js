const path = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();




// This middleware is used to enable Cross Origin Resource Sharing This sets Headers to allow access to our client application

app.use(cors());



// Storage Engine That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files

const fileStorageEngine = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "./../images"); 
    //important this is a direct path fron our current file to storage location

  },
//this filename is also a function that has access to req, file and also a call back
  filename: (req, file, cb) => {

    cb(null, Date.now() + "--" + file.originalname);

  },

});



//Route To Load Index.html page to browser
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "../public/index.html"));
});



const upload = multer({ storage: fileStorageEngine });



// Single File Route Handler

app.post("/single", upload.single("image"), (req, res) => {
  console.log("posting data");
  console.log(req.file);

  res.send("Single File upload success");

});



// Multiple Files Route Handler

app.post("/multiple", upload.array("images", 3), (req, res) => {

  console.log(req.files);

   res.send("Multiple Files Upload Success");

});



app.listen(5000,  function () {
  console.log('App started hello on port 5000');
  });