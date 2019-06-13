const bcrypt = require('bcrypt');
const db = require('../Models');
const jwt = require('jsonwebtoken');

module.exports = {

    show:(request,response)=>{
        db.Patient.findOne({guardian: request.params.id},
            (err,foundPatient)=>{
                if(err){
                    response.status(404).json({
                        message:'Patient Not Found',
                    })
                    console.log(`Err At Patient Get Request : ${err}`)
                } 
                response.json(foundPatient);
                console.log(`Found Patient: ${foundPatient}`)
                
            });
        },
    
    create:(request,response) => {
        let userId = request.params.id;
        console.log(request.body);

        newPatient = new db.Patient({
            patientName: request.params.patientName,
            patientAilments: request.params.patientAilments,
            patientAge: request.params.patientAge,
            patientInsurance: request.params.patientInsurance,
            patientCareDetails: request.params.patientCareDetails,
            location: request.params.location
        });
        db.Patient.create(newPatient,(err,createdPatient)=>{
            if(err){
                console.log(`Err @ Patient Creation: ${err}`);
                response.send().json({
                    message:"Error Creating Patient"
                })
            }
            response.json(createdPatient);
            console.log(`New Patient Created: ${createdPatient}`)
        })
    },

    update:(request,request)=>{
        const patientId = request.params.id;
        db.Patient.findByIdAndUpdate({_id:patientId
        },
        request.body,
        {new:true},
        (err,updatedPatient)=>{
            if(err){
                return console.log(`Error Occurred At Update Patient:${err}`);
            }
            response.json(updatedPatient);
        })
    },

    addGuardian:(request,response)=>{
        const patientId = request.params.id;
        const newGuardian = request.params.guardianId;

        db.Patient.findById({_id:patientId},(err,foundPatient)=>{
            if(err){
                return console.log(`Error Occurred At Add Guardian:${err}`);
            }
            foundPatient.guardian.push(newGuardian);
            foundPatient.save((err,savedPatient)=>{
                if(err){
                    console.log(`Found Patient Not Saved:${err}`)
                }
                response.json(savedPatient);
            })
        })
    },

    delete:(request,response)=>{
        const deletePatient = request.params.id;

        db.Patient.findByIdAndDelete({_id:deletePatient},(err,deletedPatient)=>{
            if(err){
                response,send("Error Deleting Patient");
                console.log(err);
            }
            response.json(deletedPatient);
            console.log(`Patient Deleted:${deletedPatient}`);
        })
    }

}