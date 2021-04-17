var base64String = 'ops';
var fs = require('fs'); // importing file system modules of node js
const path = require('path');
var request = require('request').defaults({ encoding: null });

request.get('https://i.giphy.com/media/26FLf3L9bDpYCVO5G/giphy.gif', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
       // console.log(data);
       base64String = Buffer.from(body).toString('base64');
       console.log(base64String);
     //-------------------------------------------------------------------------------------
       fs.writeFile(path.join(__dirname, '/', 'imageTobase64.txt'), base64String, 
       err => {
     if(err) throw err;
     console.log('File written to...');
     });

    }
});
