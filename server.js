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
    // res.send("hello!");
    res.json(notes);

});

// this function will take in req.query as an argument and filter through the notes accordingly, returning the new filtered aray.
// function filterByQuery(query, notesArray) {
//     let filteredResults = notesArray;
//     if(query.title) {
//         filteredResults = filteredResults.filter(note => note.title === query.title);
//     }
//     return filteredResults;
// }
// database json structure
/* [
    {
        "title":"Test Title",
        "text":"Test text"
    }
]
*/

//save icon works (save -> note to array)
//assign IDs
//related function: saveNote, handleNoteSave

//saved note appears on the left
//related function: renderNoteList

//saved note appears on the right
//related function: renderActiveNote, handleNoteView


//delete note works (remove note from array)
//related function: deleteNote, handleNoteDelete

//new note writing works (pencil icon => new note to an array)


//functions from index.js

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

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});