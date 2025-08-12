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

  if (!patient) {
    return res.status(404).jsom({ msg: 'No enconctrado' })
  }

  //Identificate veterinarian
  if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
    return res.json({ msg: 'Accion no validad' })
  }

  if (patient) {
    res.json(patient)
  }
}

const updatePatient = async (req, res) => {
  const { id } = req.params

  // Find patietn by id
  const patient = await Patient.findById(id)
  // console.log(patient)

  if (!patient) {
    res.status(404).jsom({ msg: 'No enconctrado' })
  }

  //Identificate veterinarian
  if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
    return res.json({ msg: 'Accion no validad' })
  }


  // Update patient
  patient.name = req.body.name || patient.name
  patient.owner = req.body.owner || patient.owner
  patient.email = req.body.email || patient.email
  patient.date = req.body.email || patient.date
  patient.symptom = req.body.symptom || patient.symptom

  try {
    const updatePatient = await patient.save()
    res.json(updatePatient)
  } catch (error) {
    console.log(error)
  }

}
const deletePatient = async (req, res) => {
  const { id } = req.params

  // Find patietn by id
  const patient = await Patient.findById(id)
  // console.log(patient)

  if (!patient) {
    res.status(404).jsom({ msg: 'No enconctrado' })
  }

  //Identificate veterinarian
  if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
    return res.json({ msg: 'Accion no validad' })
  }

  try {
    const deletePatient = await patient.deleteOne()
    res.json({ msg: 'Paciente Eliminado' })
  } catch (error) {
    console.log(error)
  }
}

export {
  addPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient
}
