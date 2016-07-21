/**
 * Created by ting-jui on 7/21/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('ODD_test', { title: 'ODD test' });
});

module.exports = router;
