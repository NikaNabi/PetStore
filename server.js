const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const User = require("./models/User");
console.log(User);
const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/petstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB подключена'))
  .catch(err => console.error('Ошибка подключения:', err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.static('public'));
// Регистрация пользователя
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Регистрация успешна' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка регистрации', error });
    }
});

// Вход пользователя
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Неверный email или пароль' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Неверный email или пароль' });

        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
        res.json({ message: 'Вход успешен', username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка входа', error });
    }
});

// Проверка аутентификации и получение логина
app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ username: null });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.json({ username: null });
        res.json({ username: decoded.username });
    });
});

// Выход
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Выход выполнен' });
});

// Запуск сервера
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));