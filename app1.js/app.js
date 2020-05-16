const http = require ('http')
const fs = require('fs')
const port = 3000

const server = http.createServer(function(req, res) {

    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html" : req.url
      );


let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;

  }


  if (contentType == "text/html" && extname == "") filePath += ".html";

  // log the filePath
  console.log(filePath);

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



  

res.writeHead(200, {'Constent-Type': 'text/html'})
fs.readFile('index.html', function(error, data){
    if (error){
        res.writeHead(404)
        res.write('Error: File Not Found')
    }
    else{
        res.write(data)
    }
res.end()

})



server.listen(port, function(error){

if (error){
    console.log ('something went wrong', error)

}
else
{
console.log('Server is listening on port ' + port)

}

})