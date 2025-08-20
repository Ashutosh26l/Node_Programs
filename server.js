const http=require("http");
const fs=require("fs");
const path=require("path");
const { log } = require("console");


http.createServer((req,res)=>{
    const filePath=path.join(__dirname,"file.html");

    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.writeHead(500,{"content-type":"text/plain"});
            res.end("file nahi mila");
        }else{
            res.writeHead(200,{"content-type":"text/html"});
            res.end(data);
        }
    })
}).listen(8000,()=>{
    console.log("Server successufully cahl gaya");
    log("vwvwvwv")
    
})