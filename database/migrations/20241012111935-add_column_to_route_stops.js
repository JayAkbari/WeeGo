'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('route_stops', 'route_id', {
            type: Sequelize.UUID,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            references: {
                model: 'routes',
                key: 'id',
            },
            after: 'id'
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
