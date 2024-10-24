require('dotenv').config();

const baseConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    logging: console.log,
    benchmark: true, // display query execution time
    timezone: '+05:30', // Set timezone to IST (Asia/Kolkata) // IST is UTC +05:30

    dialectOptions: {
        useUTC: false, // Do not use UTC as default
    },

    // Seeder storage options
    seederStorage: 'sequelize',
    seederStorageTableName: 'seeders',

    define: {
        // underscored: true, // Convert camelCased columns to underscored
        // freezeTableName: true, // Disable automatic pluralization of table names
        // timestamps: true, // Automatically add 'createdAt' and 'updatedAt'
    },

    pool: {
        // max: 10, // Set maximum number of connections in pool
        // min: 0,  // Minimum number of connections in pool
        // acquire: 30000, // Maximum time (ms) to get a connection
        // idle: 10000,   // Maximum time (ms) a connection can be idle
    },
};

module.exports = {
    local: {
        ...baseConfig,
    },
    development: {
        ...baseConfig,
    },
    production: {
        ...baseConfig,
    },
};
