const { model, Schema } = require('mongoose');

const studentAttendanceSchema = new Schema({
    createdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendances',
    },
});

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);
module.exports = StudentAttendance;
