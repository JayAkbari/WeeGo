'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vehicle_routes', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            vehicle_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "vehicles",
                    key: "id",
                },
            },
            route_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "routes",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('vehicle_routes');
    }
};
