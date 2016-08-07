var express = require('express'),
    app = express(),
    fs = require('fs');

app.use(express.static('src'));

app.listen(7777, function () {
    console.log('Listening on port 7777!');
});