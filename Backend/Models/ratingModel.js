const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    rateValue:Number,
    rater:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    ratee:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"

    },
    initialComment:{
        body:String,
        isLiked:{
        type:Boolean,
        default:false
        }
    },
    comments:[{
        body:String,
        isLiked:{
        type:Boolean,
        default:false
        }
        }]
})

const Ratings = mongoose.model('Ratings',RatingSchema);
module.exports = Ratings;
