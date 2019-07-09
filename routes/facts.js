var express = require('express');
var router = express.Router();
const { Op, fact, sequelize, Sequelize } = require('../models');

router.get('/query', function(req, res) {
    const { query } = req;
    const sqlQuery = {
        order: Sequelize.literal('RAND()'),
        where: {
            rating: { [Op.not]: "DELETE" }
        },
    };

    for (key in query) {
        sqlQuery.where[key] = { [Op.substring]: query[key] };
    }
    fact.findOne(sqlQuery).then(fact => res.json(fact));
});

/// TO-DO: Figure out some way to authenticate, can only come from discord or slack
/// TO-DO: Add logic for rating
router.post('/add', function(req, res) {
    //This needs to be x-www-form-urlencoded
    const { author, fact_text, source, rating } = req.body;
    sequelize
        .query('CALL postNewFact(:author, :fact_text, :source, :rating);', {
            replacements: { author: author, fact_text: fact_text, source: source, rating: rating ? rating : null },
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
