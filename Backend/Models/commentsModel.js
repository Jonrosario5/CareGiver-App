const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body:String,
    isLiked:Boolean,
    consumerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

});

const Comments = mongoose.model('Comments',CommentSchema);
module.exports = Comments;