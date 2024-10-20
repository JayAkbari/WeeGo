'use strict';

const { v4: uuidv4 } = require('uuid');

const db = require("../models");
const { hashPassword } = require("../../helpers/password");
const { CONSTANTS } = require("../../utils/constants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const superAdminRole = await db.Roles.findOne({ where: { name: CONSTANTS.ROLES.SUPER_ADMIN } });

        await db.Users.create({
            id: uuidv4(),
            name: 'Salman Khan',
            email: 'skhan003@yopmail.com',
            mobile: '3339998880',
            password: await hashPassword('Admin@1234'),
            role_id: superAdminRole.id,
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
