const http = require('http');
const path = require('path');
const fs = require('fs');
var childProcess = require('child_process');

const server = http.createServer((req,res) => {
// if (req.url === '/'){
// fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => 
// {
//     if (err) throw err;
// res.writeHead(200, {"Content-Type" : "text/html; charset=UTF-8"});
// res.end(content);

// });
// }
// //--------------------------------------------------------------------
// if (req.url === '/about'){
//     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => 
//     {
//         if (err) throw err;
//     res.writeHead(200, {"Content-Type" : "text/html; charset=UTF-8"});
//     res.end(content);
    
//     });
//     }
// //--------------------------------------------------------------------------------
// if (req.url === '/api/users'){
//     const users = [
//         {name: 'Bokiss', age: 35},
//         {name: 'Vik', age: 28}
//     ];
//     res.writeHead(200, {"Content-Type" : "application/json; charset=UTF-8"});
//     res.end(JSON.stringify(users));
    
//     }

//----------------------------------------------------------------------------------
// //--------------------------------------------------------------------------------
 if (req.url === '/api/fs'){
   
    function runScript(scriptPath, callback) {

        // keep track of whether callback has been invoked to prevent multiple invocations
        var invoked = false;
    
        var process = childProcess.fork(scriptPath);
    
        // listen for errors as they may prevent the exit event from firing
        process.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            callback(err);
        });
    
        // execute the callback once the process has finished running
        process.on('exit', function (code) {
            if (invoked) return;
            invoked = true;
            var err = code === 0 ? null : new Error('exit code ' + code);
            callback(err);
        });
        
    }
    
    // Now we can run a script and invoke a callback when complete, e.g.
    runScript('./public/gify/fs_imageTobase64_getFromUrl_base64Toimage.js', function (err) {
        if (err) throw err;
        console.log('скрипт по перегонці картинки у файл відпрацював!');
    });

    
    }

//----------------------------------------------------------------------------------
//res.writeHead(200, {"Content-Type" : "text/html; charset=UTF-8"});
//res.end('<h1> я жду... bada bum bada</h1>');
    //console.log(req.url);
 // write response
 //res.writeHead(200, {"Content-Type" : "text/plain; charset=UTF-8"});
 //res.write('Приветствую тебя о великий хозяин!\r\n');
 //res.write('Welcome greate comander!\r\n');
 //res.write('закончив навчання на 1:13 hour\r\n');
 //res.end();
 //--------------------------------------------------------------------------
// Build file path
let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
//console.log(filePath);
//res.end();
// Extension of file
let extname = path.extname(filePath);
// Initial content type
let contentType = 'text/html';
// Check ext and set content type
switch(extname) {
    case '.js': contentType = 'text/javascript'; break;
    case '.css': contentType = 'text/css'; break;
    case '.json': contentType = 'application/json'; break;
    case '.png': contentType = 'image/png'; break;
    case '.jpg': contentType = 'image/jpg'; break;
}
// Read file
fs.readFile(filePath, (err,content) => {
    if(err) {
        if(err.code == 'ENOENT') {
            // Page not found
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) =>
            {
                res.writeHead(200, {"Content-Type" : "text/html; charset=UTF-8"});
                res.end(content, 'utf8');
            })
        } else {
            // Some server error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    } else {
        // Success "contentType; charset=UTF-8"
        res.writeHead(200, {"Content-Type" : contentType});
        res.end(content, 'utf8');
    }
})
});

const PORT = process.env.PORT || 8888;

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
