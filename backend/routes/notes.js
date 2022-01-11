const express = require('express');
const router = express.Router();
const fetchuser = require('../middleWare/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: GET ALL THE NOTES USING: GET "/api/notes/createuser". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});

// ROUTE 2: ADD A NEW NOTE USING: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title', "Enter a Valid title").isLength({ min: 5 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // IF THERE IS ERRORS, RETURN BAD REQUEST AND THE ERRORS 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});

// ROUTE 3: UPADATE AN EXISTING NOTE USING: PUT "/api/notes/updatenote/:id". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        // CREATE A NEW NOTE BOJECT
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // FIND THE NOTE TO BE UPDATED AND UPDATE IT
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});

// ROUTE 4: DELETE AN EXISTING NOTE USING: DELETE "/api/notes/deletenote/:id". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // FIND THE NOTE TO BE DELETED AND DELETED IT
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send("Not Found") };

        // ALLOW DELETION ONLY OF USER OWNS THIS NOTE
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Deleted Successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
});


module.exports = router;