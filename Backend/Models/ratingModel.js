const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    rateValue:Number,
    comments:{
        type:Schema.Types.ObjectId,
        ref:"Comments"
    }
})

const Ratings = mongoose.model('Ratings',RatingSchema);
module.exports = Ratings;
