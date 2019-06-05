const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
        patientName:String,
        patientAilments:String,
        patientAge:Number,
        patientInsurance:String,
        patientCareDetails:String,
        location:String,

        guardian:[{
        type:Schema.Types.ObjectId,
        ref:"User"
        }]
});

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient
