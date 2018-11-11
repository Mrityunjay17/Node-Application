const express =require('express');
const bodyParser=require("body-parser");
const path=require('path')
const {generateBanner}=require('./controller/Banner.mjs');



var app=express();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/css",express.static(path.join(__dirname,"/public/css")));
app.use("/js",express.static(path.join(__dirname,"/public/js")));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    res.render("index"); 
});

app.get("/Banner",(req,res)=>{
    res.render("Banner");
});

app.get("/Banner/:text",(req,res)=>{
    generateBanner(req.params.text,(error,filePath)=>{
        if(error!=undefined){
            req.connection.end();
            return;
        }
        res.setHeader('Content-type','text/plain');
        res.setHeader('Content-Disposition','attachment');
        res.sendFile(__dirname+filePath);
    });
});

app.post("/generateBanner",(req,res)=>{

    if(req.body.text!=undefined && req.body.text!=""){
        res.redirect(`/Banner/${req.body.text}`); 
    }
    else{
       res.redirect("/Banner");
    }

    //res.send("/static/18615228610001011590004338369.pdf");
});

// app.get("/:name",(req,res)=>{
//     res.render("index",{name:req.params.name});
// });

app.listen(8000,()=>{
    console.log("Server Start on port on 8000");
});
