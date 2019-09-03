const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firebase = require('firebase');
require('firebase/firestore');
firebase.initializeApp({
    apiKey: 'AIzaSyA8anfeOBTQsCqDJyfQatna9Kyzf0xKs88',
	authDomain: 'mystudybuddy-6f500.firebaseapp.com',
	projectId: 'mystudybuddy'
});
var db = firebase.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.test = functions.https.onRequest((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.send("hello test");
});

exports.addUser = functions.https.onRequest((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    db.collection("users").add({
        email: req.query.email,
        firstName: req.query.firstName,
        id: req.query.id,
        lastName: req.query.lastName,
        password: req.query.password,
        username: req.query.username
    }).then(function(docRef) {
        console.log("Document written with ID: ",docRef.id);
    }).catch(function(err) {
        console.log("Error adding document: ", error);
    });
});

exports.getUser = functions.https.onRequest((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data().username + ' => ' + doc.data().id);
            if (req.query.id == doc.data().id) {
                res.send(doc.data());
            }
        });
    });
});