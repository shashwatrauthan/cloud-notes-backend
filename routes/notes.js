const express = require('express');
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');
const getuser = require("../middleware/getuser");



// ROUTE 1:  /fetchallnotes 

router.get('/fetchallnotes', getuser, async (req, res) => {

    try {
        let usernotes = await Notes.find({ user: req.id });
        res.json(usernotes);
    }
    catch (error) {
        return res.status(500).json({ error: "Some error occured." });
    }
})



// ROUTE 2:  /addnote

router.post('/addnote', getuser, [
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 1 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let usernote = await Notes.create({
            user:req.id,
            title:req.body.title,
            description:req.body.description
        })
        res.json(usernote);
    }
    catch (error) {
        return res.status(500).json({ error: "Some error occured." });
    }
})



// ROUTE 3:  /updatenote

router.put('/updatenote/:id', getuser, async (req, res) => {

    try {
        let {title,description} = req.body;
        // New Note Object
        const newNote = {title,description};
        // if(title){newNote.title= title};
        // if(description){newNote.description= description};


        // Matching User Id
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).json({ error: "Not Found." })};

        if(note.user.toString() !== req.id)
        {
            return res.status(401).json({ error: "Not Allowed" });
        }


        // Updating Note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
        res.json(note);

    }
    catch (error) {
        return res.status(500).json({ error: "Some error occured." });
    }
})


// ROUTE 4:  /deletenote

router.delete('/deletenote/:id', getuser, async (req, res) => {

    try {
        // Matching User Id
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).json({ error: "Not Found." })};

        if(note.user.toString() !== req.id)
        {
            return res.status(401).json({ error: "Not Allowed" });
        }

        
        // Deleting Note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({status: "Done", note:note});

    }
    catch (error) {
        return res.status(500).json({ error: "Some error occured." });
    }
})

module.exports = router;