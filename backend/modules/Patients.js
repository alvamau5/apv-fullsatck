import mongoose from "mongoose";

const patientsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  veterinarian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinarian'
  },
},
  {
    timestamps: true, //Create the colums of create and edit
  }
);

const Patient = mongoose.model('Patient', patientsSchema);

export default Patient;
