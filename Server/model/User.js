import mongoose from 'mongoose';
// const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: String,
    bookedVisits: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Residency',
        },
        date: {
            type: Date,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    }],
    favResidencies: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Residency',
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        }
    }],
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);

