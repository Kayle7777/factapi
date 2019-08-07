'use strict';
module.exports = (sequelize, DataTypes) => {
    const iris_prefixes = sequelize.define(
        'iris_prefixes',
        {
            text: DataTypes.STRING,
        },
        { timestamps: false }
    );
    iris_prefixes.associate = function(models) {
        // associations can be defined here
    };
    return iris_prefixes;
};
