'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('drivers', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
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
            licence_no: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            aadhar_no: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            pan_no: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            dob: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            licence_validity_upto: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            address: {
                type: Sequelize.TEXT('medium'),
                allowNull: false,
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
        await queryInterface.dropTable('drivers');
    }
};
