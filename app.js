const express = require("express");

const app = express();
const fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

app.set("view engine", "ejs");
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/south-indian", (req, res) => {
  fs.readFile("./public/data.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("south-indian", { data: JSON.parse(data) });
    }
  });
});
app.get("/add-movie", (req, res) => {
    fs.readFile("./public/data.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let count = JSON.parse(data).length
          count=count+1
          res.render("add-movie", { "id": count });
        }
      });
});

app.post("/add-movie", (req, res) => {
  console.log(req.body);
  req.body.id = parseInt(req.body.id)
  req.body.img = "./images/"+ req.body.img
  req.body.url = "https://www.youtube.com/embed/"+ req.body.url

  fs.readFile('./public/data.json', function (err, data) {
    var json = JSON.parse(data)
    json.push(req.body)
    fs.writeFile("./public/data.json", JSON.stringify(json), (err)=>{
        if(err){
            console.log(err)
        }
        else {
          res.send(JSON.stringify(req.body))
        }
    })
})

  
});

app.use((req, res) => {
  res.status(404).send("Oops! The requested page was not found.");
});

app.listen(3000);
