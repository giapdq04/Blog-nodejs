const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_education_dev');

        console.log('Connect to database successfully');
    } catch (error) {
        console.log('Connect to database failed');
    }
}

module.exports = { connection }