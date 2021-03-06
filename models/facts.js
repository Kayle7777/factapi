'use strict';
module.exports = (sequelize, DataTypes) => {
    const fact = sequelize.define(
        'fact',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            author: DataTypes.STRING,
            fact_text: DataTypes.STRING,
            source: DataTypes.STRING,
            time_added: DataTypes.DATE,
            rating: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'HELL', 'DELETE'),
        },
        {
            timestamps: false,
        }
    );
    fact.associate = function(models) {
        // associations can be defined here
    };
    return fact;
};
