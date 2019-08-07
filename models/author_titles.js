'use strict';
module.exports = (sequelize, DataTypes) => {
    const author_titles = sequelize.define(
        'author_titles',
        {
            text: DataTypes.STRING,
        },
        { timestamps: false }
    );
    author_titles.associate = function(models) {
        // associations can be defined here
    };
    return author_titles;
};
