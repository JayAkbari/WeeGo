require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cluster = require('cluster');
const os = require('os');
const swaggerUi = require('swagger-ui-express');
const expressBasicAuth = require('express-basic-auth');
const morgan = require('morgan');

const ResponseHandler = require('./utils/responseHandler');

// Initialize the Express app
const app = express();
const totalCPUs = os.cpus().length;
const port = process.env.APP_PORT || 3000;

// Middleware to enhance security headers
app.use(helmet());

// Middleware to parse incoming request bodies (JSON & URL-encoded)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to console the incoming requests
app.use(morgan('dev'));

// Middleware to handle CORS
app.use(cors({
    origin: '*',
    methods: 'PUT, POST, PATCH, DELETE, GET',
    allowedHeaders: 'Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization',
}));

// Middleware to disable caching
app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=0');
    next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to initialize a response handler
app.use((req, res, next) => {
    res.handler = new ResponseHandler(req, res);
    next();
});

// Swagger UI setup for API documentation
const swaggerDocument = require('./swagger/openapi.json');
app.use(
    '/swagger',
    expressBasicAuth({
        users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
        challenge: true,
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// Route to serve the welcome page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

// API routes
app.use('/api/:ve', require('./routes/v1'));

// Route to handle 404 errors for unhandled routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Cluster setup to utilize multiple CPU cores
if (cluster.isMaster) {
    for (let i = 0; i < totalCPUs; i++) { // Fork workers based on the number of available CPUs
        cluster.fork();
    }

    cluster.on('exit', () => { // If a worker dies, fork a new one
        cluster.fork();
    });
}
else {
    app.listen(port, () => { // Start the server in worker process
        console.log(`Server started 🚀 : ${process.env.APP_BASE_URL}`);
    });
}
