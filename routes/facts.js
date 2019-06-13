var express = require('express');
var router = express.Router();
const { facts, sequelize } = require('../models');

/* GET home page. */
router.get('/random', function(req, res, next) {
    // Node on the fact[0] -- this only ever returns ONE fact. Keep in mind, a stored procedure is returning a TABLE (therefore array)
    sequelize.query('CALL getRandomFact();', { model: facts }).then(fact => res.json(fact[0]));
});

router.get('/author/:author', function(req, res) {
    sequelize
        .query('CALL getFactsByAuthor(:author);', { model: facts, replacements: { author: req.params.author } })
        .then(fact => res.json(fact));
});

router.get('/query', function(req, res) {
    const { search } = req.query;
    sequelize
        .query('CALL getRandomQueryFact(:text);', { model: facts, replacements: { text: search } })
        .then(facts => res.json(facts[0])); // We send one because this is random from author.
});

///TO-DO: Figure out some way to authenticate, can only come from discord or slack
router.post('/add', function(req, res) {
    //This needs to be x-www-form-urlencoded
    const { author, fact_text, source } = req.body;
    sequelize
        .query('CALL postNewFact(:author, :fact_text, :source);', {
            replacements: { author: author, fact_text: fact_text, source: source },
        })
        .then(ret => {
            try {
                res.send(`${ret[0].id} - OK`);
            } catch (e) {
                res.send(e);
            }
        });
});

// Deletes the last fact in the db, but only if the author is the same as the one that sent it, and only if it is less than 1 day old.
router.delete('/whoops', function(req, res) {
    const { author } = req.body;
    sequelize.query('CALL revertLastFact(:author)', { replacements: { author: author } }).then(ret => {
        res.send(Boolean(ret[0]['@success']));
    });
});

module.exports = router;
