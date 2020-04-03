const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Informe o nome'],
        trim: true
    },
    profilePhoto: {
        type: String,
        default: 'no-photo.png'
    },
    username: {
        type: String,
        required: [true, 'Informe o nome de usuário'],
        unique: true,
        match: [/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/im, 'Informe um nome de usuário válido']
    },
    bio: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Informe um email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Informe um email válido']
    },
    phoneNumber: {
        type: Number,
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Informe um número de telefone válido']
    },
    gender: {
        type: String,
        enum: ['masculino', 'feminino', 'outro']
    },
    password: {
        type: String,
        required: [true, 'Informe uma senha'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'A senha precisa ter pelo menos 8 caracteres com ao menos 1 caractere maiúsculo e 1 caractere numérico'],
        select: false
    },
    following: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    role: {
        type: String,
        enum: ['user'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

// Reverse populate with virtuals
UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'user'
});

// Encrypt password before save to database
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

// Get signed jwt
UserSchema.methods.getSignedJWT = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Match password
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Cascade delete posts when a users is deleted
UserSchema.pre('remove', async function(next) {
    await this.model('Post').deleteMany({ user: this._id });

    next();
});

module.exports = mongoose.model('User', UserSchema);