const express = require('express');
const connectDB = require('./db');
const authenticate = require('./middleware/authenticate');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use(routes);

app.get('/private', authenticate, async (req, res) => {
    console.log('I am the user', req.user);
    return res.status(200).json({ message: 'I am private route.' });
});

app.get('/public', (req, res) => {
    return res.status(200).json({ message: 'I am a public route.' });
});

app.use((err, _req, res, _next) => {
    console.log(err);
    const message = err.message ? err.message : 'Sever Error!';
    const status = err.status ? err.status : 500;
    res.status(status).json({ message });
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
