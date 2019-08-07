'use strict';
module.exports = (sequelize, DataTypes) => {
    const memes = sequelize.define(
        'memes',
        {
            hitcount: {
                default: 0,
                type: DataTypes.INTEGER,
            },
            meme: DataTypes.STRING,
        },
        { timestamps: false }
    );
    memes.associate = function(models) {
        // associations can be defined here
    };
    return memes;
};
