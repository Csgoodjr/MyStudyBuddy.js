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

app.get('/test',function(req,res) {
    db.collection("users").add({
		email: 'axzamora@gmail.com',
		firstName: 'Adam',
		id: '14241502',
		lastName: 'Zamora',
		password: 'test2',
		username: 'axzamora98'
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