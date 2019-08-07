'use strict';
module.exports = (sequelize, DataTypes) => {
    const author_prefixes = sequelize.define(
        'author_prefixes',
        {
            text: DataTypes.STRING,
        },
        { timestamps: false }
    );
    author_prefixes.associate = function(models) {
        // associations can be defined here
    };
    return author_prefixes;
};
