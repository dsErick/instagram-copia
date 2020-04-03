const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    place: String,
    description: String,
    // hashtags: [String],
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
    timestamps: true,
    toJSON: { virtuals: true }
});

PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

PostSchema.virtual('commentsCount', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    count: true
})

// Cascade delete comments when a post is deleted
PostSchema.pre('remove', async function(next) {
    await this.model('Comment').deleteMany({ post: this._id });

    next();
});

module.exports = mongoose.model('Post', PostSchema);