const multer = require('multer');

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Create a middleware to handle file uploads
exports.uploadFile = (fileKey, maxLimit = 10) => {
    const upload = multer({
        storage: storage, // Memory storage
        limits: { fileSize: maxLimit * 1024 * 1024 } // Limit file size
    }).single(fileKey);

    return async (request, response, next) => {
        upload(request, response, (err) => {
            if (err) {
                const errorMessage = err instanceof multer.MulterError
                    ? `Maximum file size should be less than ${maxLimit} MB.`
                    : 'An error occurred while uploading the file.';
                return response.handler.badRequest(errorMessage);
            }

            next();
        });
    };
};
