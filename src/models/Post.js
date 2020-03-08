const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Por favor informe o autor']
    },
    place: {
        type: String,
        // unique: true
    },
    description: {
        type: String,
        // required: [true, 'Por favor informe uma descrição']
    },
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);