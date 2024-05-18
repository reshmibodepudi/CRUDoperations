const express= require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
const path=require("path");

const port=8080;

app.use(express.static(path.join(__dirname, "/public/css")));
// app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

let posts = [
    {
        id : uuidv4(),
        username: "Reshmi",
        content: "This is about my journey of full stack web development"
    },

    {
        id : uuidv4(),
        username: "Surekha",
        content: "This is about my journey of java programming"
    },

    {
        id : uuidv4(),
        username: "Karthik",
        content: "This is about my journey of Machine learning"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
   let {username, content} = req.body;
   let id=uuidv4();
   posts.push({id, username, content});
   res.redirect("/posts"); 
});

app.get("/posts/:id", (req, res) => {
  let {id} = req.params;
  let post = posts.find((p) => id==p.id);
  res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id==p.id);
    post.content= newcontent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id==p.id);
    res.render("edit.ejs", {post});

});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;   
    posts = posts.filter((p) => id !== p.id); 
    res.redirect("/posts");  
    });


app.listen(port, () => {
    console.log(`listening to port ${port}`);

});
