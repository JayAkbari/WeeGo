'use strict';

const { v4: uuidv4 } = require('uuid');

const db = require("../models");
const { hashPassword } = require('../../helpers/password');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await db.Parents.create({
            id: uuidv4(),
            name: 'James Bond',
            relationship: 'Father',
            email: 'jamesbond0007@yopmail.com',
            mobile: '0033664455',
            password: await hashPassword('Admin@1234'),
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
