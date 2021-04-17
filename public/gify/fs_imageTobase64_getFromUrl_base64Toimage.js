var base64String = 'ops';
var fs = require('fs'); // importing file system modules of node js
const path = require('path');
var request = require('request').defaults({ encoding: null });
var getlink = 'https://media4.giphy.com/media/26FLf3L9bDpYCVO5G/giphy.gif?cid=27592599y3hqnqn8i93tjzs23ij1byebfh93baopkfhdzjtn&rid=giphy.gif&ct=g';
request.get(getlink, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
       // console.log(data);
       base64String = Buffer.from(body).toString('base64');
       //console.log(base64String);
     //------------------------------------------------------------------------------------
     // The absolute path of the new file with its name
     var filepath = "./images/bokiss.gif";
     // Save with a buffer as content from a base64 image
     fs.writeFile(filepath, new Buffer.from(base64String, "base64"), (err) => {
     if (err) throw err;
     console.log("The file was succesfully saved!");
     console.log(base64String);
     }); 

    }
});
