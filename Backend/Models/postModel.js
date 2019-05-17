const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    consumerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    ifFilled: {
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
    Comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comments"
    }]
    
})

const Post = mongoose.model('Post',PostSchema);
module.exports = Post;