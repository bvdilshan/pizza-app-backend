require('dotenv').config();
const cloudinary = require('./config/cloudinary');

console.log('Checking Cloudinary configuration...');

if (cloudinary.config().cloud_name) {
    console.log('Cloudinary is configured with cloud_name:', cloudinary.config().cloud_name);
} else {
    console.log('Cloudinary configuration is missing cloud_name based on current environment variables.');
    console.log('Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file.');
}

if (cloudinary.config().api_key) {
    console.log('API Key is present.');
} else {
    console.log('API Key is missing.');
}

if (cloudinary.config().api_secret) {
    console.log('API Secret is present.');
} else {
    console.log('API Secret is missing.');
}
