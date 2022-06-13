const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    v,
                );
            },
        },
        message: (prop) => `Invalid email: ${prop.value}`, //-> what is prop?
    },
    password: {
        type: String,
        minlength: [4, 'Password is too short!'],
        required: true,
    },
    roles: {
        type: [String],
        required: true,
        default: ['STUDENT','MONITOR'],
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING',
        required: true,
    },
});

const User = model('User', userSchema);
module.exports = User;
