const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log("Listening on " + PORT);
});