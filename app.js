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
   
    //intro routes

    app.get("/repcare",function(req,res){
           res.render("intro");
        });
 
    //home routes
    app.get("/home",function(req,res){
          res.render("home");
        });
    
    //Service routes
    app.get("/Service",function(req,res){
      res.render("Service");
    });

    //Gallery routes
    app.get("/Gallery",function(req,res){
      res.render("Gallery");
    });

    //Login routes
    app.get("/Login",function(req,res){
      res.render("Login");
    });
   //Signup routes
    app.get("/Signup",function(req,res){
      res.render("Signup");
    });

    //Testimonials routes
    app.get("/Test",function(req,res){
      res.render("Test");
    });


    //listening to port
    app.listen(port,function(){
      console.log("Server is started....");
    });
