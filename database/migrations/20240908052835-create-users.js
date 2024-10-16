'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(50),
            },
            mobile: {
                type: Sequelize.STRING(20),
            },
            password: {
                type: Sequelize.STRING,
            },
            img_url: Sequelize.STRING,
            role_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "roles",
                    key: "id",
                },
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
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
        await queryInterface.dropTable('users');
    }
};
