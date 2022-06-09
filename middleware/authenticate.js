const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticate(req, res, next) {
    try {
        let token = req.headers.authorization;
        console.log(token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorizd.' });
        }

        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorizd.' });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(400).json({ message: 'Invalid token.', e });
    }
}

module.exports = authenticate;
