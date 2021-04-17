var fs = require('fs'); // importing file system modules of node js
const path = require('path');
var filename = "image.gif";
var binaryData = fs.readFileSync(filename); //reading binary data of file
var base64String = new Buffer.from(binaryData).toString("base64"); //converting binary data to base64 string

console.log(base64String);
//-------------------------------------------------------------------------------------

fs.writeFile(path.join(__dirname, '/', 'imageTobase64.txt'), base64String, 
err => {
    if(err) throw err;
    console.log('File written to...');
    });
