var express = require("express");
var request = require("request");
var firebase = require("firebase");
require("firebase/firestore");
firebase.initializeApp({
	apiKey: 'AIzaSyA8anfeOBTQsCqDJyfQatna9Kyzf0xKs88',
	authDomain: 'mystudybuddy-6f500.firebaseapp.com',
	projectId: 'mystudybuddy'
});

var db = firebase.firestore();

var app = express();
app.use(express.static(__dirname));

app.get('/add',function(req,res) {
    db.collection("users").add({
		email: req.query.email,
		firstName: req.query.firstName,
		id: req.query.id,
		lastName: req.query.lastName,
		password: req.query.password,
		username: req.query.username
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
});

app.listen(8080, function() {
	console.log('Server Started...');
});