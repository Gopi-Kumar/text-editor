// const formidable = require("formidable");
// const http = require("http");
const path = require('path');
const fs = require('fs');

fs.writeFile('mynewfile2.txt', 'Hello content!', function (err) {
	if (err) throw err;
	console.log('Saved!');
});