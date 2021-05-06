let APIKEY = "G6V04Ouy9iPEtk1XvmtkleLHZHVG9Kdu";
// нужно взять свой личний ключ на сайте https://developers.giphy.com/dashboard/
document.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); // to stop the page reload
        let stroka = document.getElementById("search").value;
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=${stroka}`;
       // let str = document.getElementById("search").value.trim();
        //url = url.concat(str);
            var levelg = [];
            var levelpg = [];
            var levelpg13 = [];
            var levelr = [];
        console.log(url);
        fetch(url)
        .then(response => response.json() )
        .then(content => {
            console.log(content.data);
            console.log("META", content.meta);
            let j = 0;
            let j2 = 0;
            let j3 = 0;
            let j4 = 0;
            for (var i=0; i<content.data.length; i++){
            // data, pagination, meta
            //console.log(content.data);
           // console.log("META", content.meta);
            let fig = document.createElement('figure');
            let img = document.createElement('img');
            let fc = document.createElement('figcaption');
            img.src = content.data[i].images.downsized.url;
            img.alt = content.data[i].title;
            let imgrating = content.data[i].rating;
            fc.textContent = content.data[i].title;
            fig.appendChild(img);
            fig.appendChild(fc);
            
           //-------------------------------------------------------------
           if (imgrating == 'g') {levelg[j] = [fig]; console.log(content.data[i].rating); console.log(fig); j++;}
           else if (imgrating == 'pg') {levelpg[j2] = [fig]; console.log(content.data[i].rating); j2++;}
           else if (imgrating == 'pg-13') {levelpg13[j3] = [fig]; console.log(content.data[i].rating); j3++;}
           else if (imgrating == 'r') {levelr[j4] = [fig]; console.log(content.data[i].rating); j4++;}
           else console.log('невідомий признак сортування');
           //-------------------------------------------------------------
           // let out = document.querySelector('.out');
            //out.insertAdjacentElement('afterbegin', fig);
           //document.querySelectorAll('.out').forEach((n, i) => n.outerHTML = levelg[i][0].outerHTML);
            //document.querySelectorAll('.out').forEach((n, i) => n.textContent = levelg[i][0].outerHTML);
            //out.insertAdjacentElement('beforeEnd', fig);
            //--------------------------------------------------------------
            }
            document.querySelector('#search').value = '';
            console.log("масив level_g",levelg);
            console.log("масив level_pg",levelpg);
            console.log("масив level_pg-13",levelpg13);
            console.log("масив level_r",levelr);
           // console.log(levelg[0][0].outerHTML);
           // ВИВОД НА ЕКРАН МАСИВА

           //document.querySelectorAll('.out').forEach((n, i) => n.outerHTML = levelg[i][0].outerHTML);
           var strokalevel_g = '<div>массив level_g: </div>';    
           if (levelg.length != 0) {
           for (let i=0; i<levelg.length; i++) {
        var elem_g = levelg[i][0].outerHTML;
         strokalevel_g += '<div>' + elem_g + '</div>';
                              }}
                              else {strokalevel_g += '<div>' + 'в цьому масиві всі гіфки зїв кіт !' + '</div>';}
            var strokalevel_pg = '<div>массив level_pg: </div>';    
            if (levelpg.length != 0) {
           for (let i=0; i<levelpg.length; i++) {
        var elem_pg = levelpg[i][0].outerHTML;
         strokalevel_pg += '<div>' + elem_pg + '</div>';
                              }}
                              else {strokalevel_pg += '<div>' + 'в цьому масиві всі гіфки зїв кіт !' + '</div>';}
            var strokalevel_pg13 = '<div>массив level_pg-13: </div>';    
            if (levelpg13.length != 0) {
           for (let i=0; i<levelpg13.length; i++) {
        var elem_pg13 = levelpg13[i][0].outerHTML;
         strokalevel_pg13 += '<div>' + elem_pg13 + '</div>';
                              }}
                              else {strokalevel_pg13 += '<div>' + 'в цьому масиві всі гіфки зїв кіт !' + '</div>';}
            var strokalevel_r = '<div>массив level_r: </div>'; 
            if (levelr.length != 0) {
                  
           for (let i=0; i<levelr.length; i++) {
        var elem_r = levelr[i][0].outerHTML;
         strokalevel_r += '<div>' + elem_r + '</div>';
                              } }
                              else {strokalevel_r += '<div>' + 'в цьому масиві всі гіфки зїв кіт !' + '</div>';}

        document.querySelectorAll('.out').forEach((n, i) => n.innerHTML = strokalevel_g);
        document.querySelectorAll('.out_pg').forEach((n, i) => n.innerHTML = strokalevel_pg);
        document.querySelectorAll('.out_pg13').forEach((n, i) => n.innerHTML = strokalevel_pg13);
        document.querySelectorAll('.out_r').forEach((n, i) => n.innerHTML = strokalevel_r);

          //------------------------------------------------------------------------
        
        
        //----------------------------------------------------------------
        //все що нижче це блок витяжки картинки за посиланням та збереження її в файл-картинку
        //но он в браузере не работает только на серваке.
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

          
           //-----------------------------------------------------------------
        })
        .catch(err =>{
            console.error(err);
        })
    });
}