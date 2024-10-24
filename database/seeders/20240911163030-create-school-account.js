'use strict';

const { v4: uuidv4 } = require('uuid');

const db = require("../models");
const { hashPassword } = require('../../helpers/password');
const { CONSTANTS } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await db.Schools.create({
            id: uuidv4(),
            name: 'Mahatma Gandhi School',
            email: 'mahatma-gandhi-school@yopmail.com',
            mobile: '1122334455',
            password: await hashPassword(CONSTANTS.PASSWORD.DEFAULT),
            address: 'S.G Highway',
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
