const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, function() {
	console.log("Listening on " + PORT);
});