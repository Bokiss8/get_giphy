var express = require('express');
var php = require("./main");
// var php = require("phpcgijs"); 
var path = require("path");

var app = express();
var p = path.join("test/php");

// Following is the structure for providing the declaration of paths and options:

// app.use("/", php.cgi(
//             "/path/to/phpscript.php", 
//             {
//                 "options": {"-c": "/to/php/ini/path/php.ini"}
//             }
//         ));

// Following works without a local PHP-CGI path and tries to 
//          use PHP-CGI installed in system by default:

// app.use("/", php.cgi("/path/to/phpscript")); 

// Following uses a path in second argument defining the local copy of 
//          PHP-CGI that you want to use for the application

// app.use("/", php.cgi(
//             "/path/to/phpscript.php", 
//             {
//                 "cgi_path":"to/php/cgi/path/php-cgi",
//                 "options": {"-c": "/to/php/ini/path/php.ini"}
//             }
//         ));

// options are PHP-CGI command line options and can be found in documentation
// It can also be found in readme-php-options.txt (check for update in docs)
// options ignore -h and --help

app.use("/", php.cgi(p, { cgi_path: '/usr/bin/', options: { "-c": "/etc/php.ini" } }));
app.listen(9090, '127.0.0.1');
console.log("Server listening at 9090!");