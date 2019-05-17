const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsumerSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    userType:String,
    fullName:String,
    userEmail:{
        type:String,
        required:true,
        unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    userPassword:{
        type:String,
        required:true,
        select:false
    },
    userRatings:[{
        type:Schema.Types.ObjectId,
        ref:"Ratings"
    }],
    userSchedule:[{
        type:Date
    }],
    patientDetails:{
        patientName:String,
        patientAilments:String,
        patientAge:Number,
        patientInsurance:String,
        patientCareDetails:String,
        location:String
    },
    userCerts:[{
        // Need to add a string value in conjunction with boolean value
        type:String
    }],
    userResume:{
        // Need to convert to a PDF uploader 
        type:String
    }
});

// backup method to delete password from the database result
ConsumerSchema.set('toJSON', {
    // document, return, option
    transform: function (doc, ret, opt) {
      delete ret['userPassword']
      return ret
    },
  });

const User = mongoose.model('User', ConsumerSchema);
module.exports = User

