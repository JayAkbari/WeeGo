'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('students', 'assigned_route_stop_id', {
            type: Sequelize.UUID,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            references: {
                model: 'route_stops',
                key: 'id',
            },
            after: 'assigned_route_id'
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
