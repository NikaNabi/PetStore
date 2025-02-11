const mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState !== 0) return; // Проверяем, не подключена ли уже база

    try {
        await mongoose.connect('mongodb://localhost:27017/petstore');
        console.log('MongoDB подключена');
    } catch (error) {
        console.error('Ошибка подключения к MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;