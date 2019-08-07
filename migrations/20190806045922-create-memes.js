'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('author_titles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            meme: {
                type: Sequelize.STRING,
            },
            hitcount: {
                type: Sequelize.INTEGER,
                default: 0,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('author_titles');
    },
};
