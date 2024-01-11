// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) {
            return next(err);
        }

        res.json(comments);
    });
});

// Add a comment
router.post('/', function(req, res, next) {
    var comment = new Comment(req.body);

    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }

        res.json(comment);
    });
});

// Get a comment
router.get('/:id', function(req, res, next) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return next(err);
        }

        res.json(comment);
    });
});

// Update a comment
router.put('/:id', function(req, res, next) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return next(err);
        }

        comment.body = req.body.body;

        comment.save(function(err, comment) {
            if (err) {
                return next(err);
            }

            res.json(comment);
        });
    });
});

// Delete a comment
router.delete('/:id', function(req, res, next) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            return next(err);
        }

        comment.remove(function(err, comment) {
            if (err) {
                return next(err);
            }

            res.json(comment);
        });
    });
});

module.exports = router;

// Path: index.js
