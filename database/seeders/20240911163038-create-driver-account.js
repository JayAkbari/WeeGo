'use strict';

const { v4: uuidv4 } = require('uuid');

const db = require("../models");
const { hashPassword } = require('../../helpers/password');
const { CONSTANTS } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await db.Drivers.create({
            id: uuidv4(),
            name: 'Jack Ryan',
            email: 'jackryan001@yopmail.com',
            mobile: '5522990088',
            password: await hashPassword(CONSTANTS.PASSWORD.DEFAULT),
            licence_no: 'ABZIS12300Z',
            aadhar_no: '1111 2222 3333',
            pan_no: 'DFMQZ9526B',
            dob: new Date(),
            licence_validity_upto: new Date(),
            address: 'C.G. Road',
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
