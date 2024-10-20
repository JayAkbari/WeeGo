'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('routes', 'driver_id', {
            type: Sequelize.UUID,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            references: {
                model: 'drivers',
                key: 'id',
            },
            after: 'from_stop'
        });

        await queryInterface.addColumn('routes', 'vehicle_id', {
            type: Sequelize.UUID,
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            references: {
                model: 'vehicles',
                key: 'id',
            },
            after: 'driver_id'
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
