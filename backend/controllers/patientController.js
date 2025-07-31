import Patient from "../modules/Patients.js"

const addPatient = async (req, res) => {

  const patient = new Patient(req.body);
  patient.veterinarian = req.veterinarian._id;

  try {
    const patientStored = await patient.save();
    res.json(patientStored)
  } catch (error) {
    console.log(error)
  }
}

const getPatients = async (req, res) => {
  const patients = await Patient.find()
    .where("veterinario")
    .equals(req.veterinarian)
  res.json(patients)

}

const getPatient = async (req, res) => {

  const { id } = req.params

  // Find patietn by id
  const patient = await Patient.findById(id)
  // console.log(patient)

  //Identificate veterinarian
  if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
    return res.json({ msg: 'Accion no validad' })
  }

  if (patient) {
    res.json(patient)

  }
}
const updatePatient = async (req, res) => { }
const deletePatient = async (req, res) => { }

export {
  addPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient
}
