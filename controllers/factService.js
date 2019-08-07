'use strict';
module.exports = async function formatReplyString(requestBody, authorSearch, sequelize) {
    let prefixes = await sequelize.query('CALL getStringHelpers()');
    const { irisPrefix, authorPrefix, authorTitle } = prefixes[0];
    const authorString = `${authorPrefix} by the ${authorTitle} ${requestBody.author}`;
    return `${irisPrefix} ${requestBody.fact_text}!${authorSearch ? ' -- ' + authorString : ''}`;
};
