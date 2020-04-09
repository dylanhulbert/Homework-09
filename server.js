const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html")); 
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err,data) => {
    if (err) throw err;
    res.json(JSON.parse(data)); 
  });
}); 

app.post("/api/notes", function (req, res) {
  fs.readFile("db/db.json", (err,data) => {
    jsonDB = JSON.parse(data); 
    let newNote = req.body;
    newNote.id = jsonDB.length;
    jsonDB.push(newNote)
    jsonDB = JSON.stringify(jsonDB); 
    fs.writeFile('db/db.json', jsonDB, (err, data) => {
      if (err) throw err; 
      res.json(jsonDB) 
    });
  });
});

app.delete("/api/notes/:id", function(req,res){
  const IDList = parseInt(req.params.id);
    fs.readFile("db/db.json", (err,data) => {
      jsonDB = JSON.parse(data); 
      const updated = jsonDB.filter(item => {
        return item.id !== IDList
      });
    fs.writeFile('db/db.json', JSON.stringify(updated), (err, data) => {
      if (err) throw err; 
      res.json(updated) 
    });
    });  
}); 

app.listen(PORT, function() {
	console.log("Listening on " + PORT);
});