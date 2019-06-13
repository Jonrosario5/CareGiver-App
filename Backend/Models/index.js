const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cargiver',{
    useNewUrlParser:true
});

module.exports.Post = require('./postModel');
module.exports.User = require('./userModel');
module.exports.Patient = require('./patientModel');
module.exports.Ratings = require('./ratingModel');