var express = require("express"),
    app = express();
    const port = process.env.PORT ||3000;

    app.set("view engine","ejs");
    app.use(express.static(__dirname + '/public'));

    //routes

    //landing routes

    app.get("/",function(req,res){
     res.render("landing");
    });

    //listening to port
    app.listen(port,function(){
      console.log("Server is started....");
    });
