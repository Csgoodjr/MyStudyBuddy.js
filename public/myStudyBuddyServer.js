var express = require("express");
var request = require("request");
var mysql = require("mysql");
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "rea63drexel",
	database: "transcript"
});

var app = express();
app.use(express.static(__dirname));

app.get('/',function(req,res) {
    res.json({'ans':1});
});

app.listen(8080, function() {
	console.log('Server Started...');
});