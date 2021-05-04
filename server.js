let notes = require('./db/db.json');
// database json structure is array

const fs = require("fs");
const path = require("path");

const express = require("express");
const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
};

function createNewNote(body, notesArray) {
    // console.log(body);
    const note = body;
    notesArray.push(note);
    //write to db.json (join directory name and path to db.json)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify( notesArray, null, 2)
    );
    // return finished code to post route for response
    return note;
};

// add validation
function valdiateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

//saved note appears on the right



app.get('/api/notes', (req, res) => {
    // res.send("hello!");
    // res.json(notes);
    let results = notes;
    // console.log(req.query);
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// this function will take in req.query as an argument and filter through the notes accordingly, returning the new filtered aray.
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if(query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    return filteredResults;
}

//save icon works (save -> note to array)
//assign IDs
//related function: saveNote, handleNoteSave
// param route must come after the other GET route.
// req.param is specific to a single property like "id"
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id);
    // unfiltered results
    console.log(notes);
    
    notes = notes.filter(note => note.id !== req.params.id);

    // filtered results
    console.log(notes);
    
    // overwrite
    notesArray.push(notes);
    // send
    res.json(notes);
});

//saved note appears on the left
//related function: renderNoteList
//related function: renderActiveNote, handleNoteView
//needs middleware to work
app.post('/api/notes', (req, res) => {
    //req.body is where the incoming content will be placed
    //set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
    // console.log(req.body);

    // if any data in req.body is incorrect, send 400 error back
    if(!valdiateNote(req.body)) {
        res.status(400).send("The note is not properly formatted");
    } else {
        //add new note to notes array
        const note = createNewNote(req.body, notes);
        res.json(note);        
    }
});

//delete note works (remove note from array)
//related function: deleteNote, handleNoteDelete
// app.delete('/api/notes', (id) => {
//     deleteNote(id);
// });

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



// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);
//functions from index.js