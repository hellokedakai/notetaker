const { notes } = require('./db/db.json');

const fs = require("fs");
const path = require("path");

const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
    console.log("hello!");
});

// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

// htmlRoutes
// link to the notes page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


//save icon works

//saved note appears on the left

//saved not appears on the right

//new note writing

//functions from index.js

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});