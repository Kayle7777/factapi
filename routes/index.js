var express = require('express');
var router = express.Router();
const fact = require('../models').fact;

/* GET home page. */
router.get('/', function(req, res, next) {
    fact.findOne({ where: { id: '1' } }).then(fact => res.json(fact));
});

module.exports = router;
