var express = require('express');
var router = express.Router();
const { Op, fact, sequelize, Sequelize } = require('../models');

router.get('/query', function(req, res) {
    const { query } = req;
    const sqlQuery = {
        order: Sequelize.literal('RAND()'),
        where: {},
    };

    for (key in query) {
        sqlQuery.where[key] = { [Op.like]: `%${query[key]}%` };
    }
    fact.findOne(sqlQuery).then(fact => res.json(fact));
});

///TO-DO: Figure out some way to authenticate, can only come from discord or slack
/// TO-DO: Add logic for rating
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
// Do I want to do this and continue on with the stored procedure thing? Or do I want to go full Sequelize API. Think on it.
// arguments is an array, searchParams is an object.

module.exports = router;
