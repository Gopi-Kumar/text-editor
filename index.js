const express = require('express')
const app = express()

const path = require('path');
const bodyParser = require('body-parser');
const formidable = require("formidable")
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const port = process.env.PORT || 5000
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({storage : storage});


//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');


//Routes
app.get('/', function(req, res){
  const data = {
    textDocumentContent : " ",
    textDocumentTitle: "Untitled",
  }
  res.render('index', data)
})

app.post('/openfile',upload.single('myfile'),(req,res)=>{ 
  console.log(req.file);
  let file = req.file;
  let name = file.filename;
  fs.readFile(`uploads/${name}`, (err, data) => {
    if(err){
      return res.status(500).json({mesage : "server gadbad"})
    }
   
    res.status(200).json({
      data : data.toString(),
      name
    });
  })

 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})