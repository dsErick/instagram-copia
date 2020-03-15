const crypto = require('crypto');
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
    },
    expires: Date
});

// Create token
TokenSchema.statics.createToken = async function(user, expires) {
    const token = crypto.randomBytes(20).toString('hex');
    await this.create({
        user,
        token: crypto.createHash('sha256').update(token).digest('hex'),
        expires: Date.now() + expires * 60 * 1000
    });
    return token;
}

TokenSchema.statics.matchToken = async function(token) {
    return await this.findOne({
        token: crypto.createHash('sha256').update(token).digest('hex'),
        expires: { $gt: Date.now() }
    });
}

module.exports = mongoose.model('Token', TokenSchema);