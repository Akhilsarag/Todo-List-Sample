const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// In-memory task list (each task will have an ID)
let items = [];
let idCounter = 1;

// Show the list
app.get("/", function (req, res) {
    res.render("list", { ejes: items });
});

// Add new task
app.post("/", function (req, res) {
    const item = req.body.ele1.trim();

    if (item !== "") {
        items.push({ id: idCounter++, name: item });
    }

    res.redirect("/");
});

// Delete task
app.post("/delete", function (req, res) {
    const deleteId = parseInt(req.body.deleteId);
    items = items.filter(item => item.id !== deleteId);
    res.redirect("/");
});

// Update task
app.post("/update", function (req, res) {
    const updateId = parseInt(req.body.updateId);
    const updatedText = req.body.updatedText.trim();

    const task = items.find(item => item.id === updateId);
    if (task && updatedText !== "") {
        task.name = updatedText;
    }

    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});