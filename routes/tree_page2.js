var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('tree_page2', { title: 'tree' });
});

module.exports = router;
