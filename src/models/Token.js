const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Token', TokenSchema);