const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            min: 6,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        firstName: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
        lastName: {
            type: String,
            required: true,
            min: 6,
            max: 20
        },
    }
);

const RatingSchema = new Schema(
    {
        ratedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        rate: {
            type: Number,
            required: true
        },
        ratedDate: {
            type: Date
        },
        updatedDate: {
            type: Date
        },
        comment: {
            type: String
        }
        
    }
)

const PostSchema = new Schema(
    {
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        editDate: {
            type: Date
        },
        title: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        description: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        dateposted: {
            type: Date,
        },
        price: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        ratings: [RatingSchema]
    }
);

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

module.exports = {
    User: User,
    Post: Post
};