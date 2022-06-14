const { model, Schema } = require('mongoose');

const studentAttendanceSchema = new Schema(
    {
        createdAt: Date,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        adminAttendance: {
            type: Schema.Types.ObjectId,
            ref: 'AdminAttendances',
            required: true,
        },
    },
    { timestamps: true },
);

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);
module.exports = StudentAttendance;
