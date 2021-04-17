var fs = require('fs');
const path = require('path');
// read file
// a base64 string of a gif image
var codik = '';
codik = fs.readFileSync(path.join(__dirname, '/', 'imageTobase64.txt'), 'utf8', (err, data) => {
if(err) throw err;
//console.log(data);
});
// The absolute path of the new file with its name
 var filepath = "image2.gif";
// Save with a buffer as content from a base64 image
fs.writeFile(filepath, new Buffer.from(codik, "base64"), (err) => {
if (err) throw err;
 console.log("The file was succesfully saved!");
 console.log(codik);
}); 