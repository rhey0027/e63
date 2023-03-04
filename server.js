const express=require("express");
const app=express();
//--morgan section
const morgan=require("morgan");
//--morgan logger
//app.use(morgan("combined"));
//--custom logger
//--create middleware that will log the request method, url, and the date/time of the request
const logger=(req,res,next)=>{
      console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}${new Date().toDateString()}`);
      next();
};
app.use(logger);
//--protected route
const protected=(req,res,next)=>{
      //console.log("hello");
      let userLoginDetails={
            isLogin: true,
            username:"Rhey"
      };
      if(userLoginDetails.isLogin){
            next();
      }else{
            return res.json("You must Login first Dude!");
      }
};
//--require isAdmin route middleware
const isAdmin=(req,res,next)=>{
      //console.log("hello");
      let userType={
            isLogin: true,
            username:"Rhey"
      };
      if(userType.isAdmin){
            console.log("Welcome ${userType.username}");
            next();
      }
      else{
            return res.json("you must be an admin!");
      }
};
//--app.use protected
//--home route
app.get("/",(req,res)=>{
      res.send("home page");
});
//--middle chained
//-login route
app.get("/login",(req,res)=>{
      res.send("login successful");
});
//--@rote authenticated users
//--create post route
app.get("/create-post",(req,res)=>{
      res.json({message:"Post created"});
});
//@role: public users
//--fetch all post route
app.get("/post",(req,res)=>{
      res.json({message:"fetch all post"});
});
//--role admin
//--delete route
app.delete("/posts/:id",protected, isAdmin,(req,res)=>{
      res.json({message:"Post Deleted"});
});
app.listen(3000,()=>{
      console.log("Server running at post 3000");
});