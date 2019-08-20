const express = require('express');

var app = express();

app.get('/',function(req,res) {
    res.json({'ans':1});
});

app.listen(8080);