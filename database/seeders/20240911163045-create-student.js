'use strict';

const { v4: uuidv4 } = require('uuid');

const db = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await db.Students.create({
            id: uuidv4(),
            custom_id: 'S0001',
            name: 'Meet',
            dob: new Date(),
            gender: 'Female',
            address: 'C.G. Road',
            area: 'Iscon Road',
            class: '10',
        });
    },

    async down(queryInterface, Sequelize) {

    }
};
