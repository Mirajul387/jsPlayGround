const express = require('express');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
app.use(express.json());

app.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exist' });
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;

        await user.save();

        return res
            .status(201)
            .json({ message: 'User Created Successfully.', user });
    } catch (e) {
        next(e);
    }
});

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credintial!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credintial!' });
        }

        delete user._doc.password; // -> what is alias?

        return res.status(200).json({ message: 'Login Successfully!', user });
    } catch (e) {
        next(e);
    }
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Sever Error!' });
});

connectDB('mongodb://localhost:27017/attendance-db')
    .then(() => {
        console.log('Database is connected.');
        app.listen(8011, () => {
            console.log('Listening on port 8011');
        });
    })
    .catch((e) => {
        console.log(e);
    });
