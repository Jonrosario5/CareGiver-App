const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    isFilled: {
        type:Boolean,
        default:false
    },
    isPast: {
        type:Boolean,
        default:false
    },
    creationDate:{
        type:Date,
        default:Date.now
    },
    postedRate:String,
    details:String,
})

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;