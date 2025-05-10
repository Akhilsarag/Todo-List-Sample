const express = require("express")
const bodyParser = require ("body-parser")


const app = express();
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
const items=[]
const example="working";
app.get("/",function(req,res){
    res.render("list",{ejes : items})
});

app.post("/",function(req,res){
    const item = req.body.ele1;
    items.push(item);
    res.redirect("/");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

