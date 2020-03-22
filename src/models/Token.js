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
    jwt: {
        type: String,
        required: function() { return this.tokenType === 'refresh' }
    },
    tokenType: {
        type: String,
        enum: ['refresh', 'verification', 'resetPassword'],
        default: 'refresh'
    },
    expiresAt: Date
},{
    timestamps: true
});

// Create token
TokenSchema.statics.createToken = async function(user, expires, tokenType, jwt) {
    const token = crypto.randomBytes(20).toString('hex');

    const obj = {
        user,
        token: crypto.createHash('sha256').update(token).digest('hex'),
        tokenType,
        expiresAt: Date.now() + expires * 60 * 1000
    }

    if (tokenType === 'refresh') obj.jwt = jwt;
    
    await this.create(obj);
    return token;
}

// Match token in database
TokenSchema.statics.matchToken = async function(token, tokenType, jwt, user) {
    const conditions = {
        token: crypto.createHash('sha256').update(token).digest('hex'),
        tokenType,
        expiresAt: { $gt: Date.now() }
    };

    if (jwt) conditions.jwt = jwt;
    if (user) conditions.user = user;
    
    return await this.findOne(conditions);
}

// Delete refresh token from user when login
TokenSchema.pre('save', async function(next) {
    if (this.isModified('token')) await this.model('Token').deleteMany({ user: this.user, tokenType: 'refresh' });
    next();
});

module.exports = mongoose.model('Token', TokenSchema);