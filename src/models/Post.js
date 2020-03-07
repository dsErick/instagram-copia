const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);