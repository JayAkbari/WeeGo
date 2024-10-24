const express = require('express');
const app = express();

// Import API paths and route handlers
const API_PATH = require('../../utils/apiEndPoints');

// Route handler mappings
const routes = [
    { path: API_PATH.AUTH.BASE, handler: require('./authRoutes') },
    { path: API_PATH.IMPORT.BASE, handler: require('./importRoutes') },
    { path: API_PATH.DRIVERS.BASE, handler: require('./driverRoutes') },
    { path: API_PATH.VEHICLES.BASE, handler: require('./vehicleRoutes') },
    { path: API_PATH.STUDENTS.BASE, handler: require('./studentRoutes') },
    { path: API_PATH.ROUTES.BASE, handler: require('./routeRoutes') },
    { path: API_PATH.LOCATION.BASE, handler: require('./locationRoutes') },
    { path: API_PATH.PUSHER.BASE, handler: require('./pusherRoutes.js') },
    { path: API_PATH.SCHOOLS.BASE, handler: require('./schoolRoutes.js') },
];

// Register all routes dynamically
routes.forEach(route => app.use(route.path, route.handler));

module.exports = app;
