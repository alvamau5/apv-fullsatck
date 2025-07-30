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

export {
  addPatient,
  getPatients
}
