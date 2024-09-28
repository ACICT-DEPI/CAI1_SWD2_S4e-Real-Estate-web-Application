import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
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
