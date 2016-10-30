var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = mongoose.model('Note');



router.route('/notes/:board')

    // Get all notes for current board
    .get(function(req, res) {
        Note.find({board: req.params.board}, {}, function(err, notes) {
            if (err)
                res.send(500, err);

            return res.json(notes);
        })
    })

    // Add a note to board
    .post(function(req, res) {
        var note = new Note(JSON.parse(Object.keys(req.body)[0]));
        note.save(function(err) {
            if (err)
                res.send(err)

            res.json(note);
        });
    })

    // Edit a note from board
    .put(function(req, res) {
        var note = JSON.parse(Object.keys(req.body)[0]);
        Note.findOneAndUpdate({
            _id: note._id
        }, {
            text: note.text,
            color: note.color,
        }, function(err) {
            if (err)
                return res.send(err);

            res.json(note);
        });
    })

    // Delete a note from board
    .delete(function(req, res) {
        var _id = JSON.parse(Object.keys(req.body)[0]);
        Note.findOneAndRemove({
            _id
        }, function (err, note) {
            if (err)
                return res.send(err);

            res.json(note);
        });
    });

router.route('/notes/:board/note/:_id');

module.exports = router;
