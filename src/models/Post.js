const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Por favor informe o autor']
    },
    place: String,
    description: {
        type: String
    },
    hashtags: [String],
    image: String,
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);