var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stickies.io', board: 'home' });
});

router.get('/:board', function(req, res, next) {
    res.render('index', {title: 'Stickies.io', board: req.params.board })
});

module.exports = router;
