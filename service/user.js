const User = require('../models/User');

const findUserByProperty = (key, value) => {
    if (key === '_id') {
        return User.findById(value); //-> The operational cost of findById is good.
    }
    return User.findOne({ [key]: value });
};

/**
 * -> In the below function we Destructuring name, email, password twice. why? The answer is MongoDB is schemaless DB. So we need to be careful here.
 * -> We didn't hash the password here,why? Because it's not it's duty,
 */
const createNewUser = ({ name, email, password }) => {
    const user = new User({ name, email, password });
    return user.save(); // -> Save data to db and back
};

module.exports = {
    findUserByProperty,
    createNewUser,
};
