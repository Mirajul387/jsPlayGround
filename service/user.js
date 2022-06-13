const User = require('../models/User');

const findUser = () => {
    return User.find();
};

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
const createNewUser = ({ name, email, password, roles, accountStatus }) => {
    const user = new User({
        name,
        email,
        password,
        roles: roles ? roles : ['STUDENT'],
        accountStatus: accountStatus ? accountStatus : 'PENDING',
    });
    return user.save(); // -> Save data to db and back
};

const updateUser = async (id, data) => {
    const user = await findUserByProperty('email', data.email);

    if (user) {
        throw error('Email already in use', 400);
    }
    return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
    findUserByProperty,
    createNewUser,
    findUser,
    updateUser
};
