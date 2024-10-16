'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('students', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            custom_id: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dob: {
                type: Sequelize.DATEONLY
            },
            gender: {
                type: Sequelize.ENUM('Male', 'Female', 'Other')
            },
            address: {
                type: Sequelize.TEXT('medium'),
            },
            area: {
                type: Sequelize.TEXT('medium'),
            },
            class: {
                type: Sequelize.STRING
            },
            img_url: {
                type: Sequelize.STRING,
            },
            school_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "schools",
                    key: "id",
                },
            },
            assigned_route_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "routes",
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
        await queryInterface.dropTable('students');
    }
};
