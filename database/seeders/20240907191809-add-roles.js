'use strict';

const { v4: uuidv4 } = require('uuid');
const { CONSTANTS } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("roles", [
            {
                id: uuidv4(),
                name: CONSTANTS.ROLES.SUPER_ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: CONSTANTS.ROLES.SCHOOL,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: CONSTANTS.ROLES.PARENTS,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: CONSTANTS.ROLES.DRIVER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {

    }
};
