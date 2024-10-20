const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('../database/models');

// Umzug for migrations
const migrationUmzug = new Umzug({
    migrations: {
        glob: '../database/migrations/*.js', // Path to your migration files
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: 'SequelizeMeta' }),
    // logger: console,
});

// Umzug for seeders
const seederUmzug = new Umzug({
    migrations: {
        glob: '../database/seeders/*.js', // Path to your seeder files
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: 'seeders' }),
    // logger: console,
});

// Run migrations and seeders
const runMigrationsAndSeeders = async () => {
    try {
        await migrationUmzug.up();
        console.log('✨ Migrations executed successfully. ✨');

        await seederUmzug.up();
        console.log('✨ Seeders executed successfully. ✨');
    }
    catch (error) {
        console.error('Error running migrations or seeders: ⛓️‍💥 ', error);
    }
};

module.exports = runMigrationsAndSeeders;
