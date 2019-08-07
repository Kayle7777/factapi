var express = require('express');
var router = express.Router();
const { Op, fact, sequelize, Sequelize } = require('../models');

router.get('/query', function(req, res) {
    const { query } = req;
    const sqlQuery = {
        order: Sequelize.literal('RAND()'),
        where: {
            rating: { [Op.not]: 'DELETE' },
        },
    };

    for (key in query) {
        sqlQuery.where[key] = { [Op.substring]: query[key] };
    }
    fact.findOne(sqlQuery).then(async fact => {
        if (!fact) {
            let meme = await sequelize.query('CALL hitMeme()');
            let failureString = `Sorry, couldn't find a fact for '${
                query['fact_text']
            }'. You should add one, or try searching for '${meme[0].meme}'`;
            res.json({
                fact_text: failureString,
            });
        } else
            res.json({
                fact_text: await require('../controllers/factService.js')(fact, query['author'], sequelize),
                id: fact.id,
                author: fact.author,
            });
    });
});

router.get('/query/meme', function(req, res) {
    sequelize.query('CALL hitMeme()').then(ret => res.send(ret[0]));
});

/// TO-DO: Figure out some way to authenticate, can only come from discord or slack
/// TO-DO: Add logic for rating
router.post('/add', function(req, res) {
    //This needs to be x-www-form-urlencoded
    const { author, fact_text, source, rating } = req.body;
    sequelize
        .query('CALL postNewFact(:author, :fact_text, :source, :rating);', {
            replacements: { author: author, fact_text: fact_text, source: source, rating: rating ? rating : 'PG-13' },
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
