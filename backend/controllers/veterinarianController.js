import Veterinarian from "../modules/Veterinarian.js"

const register = async (req, res) => {
  const { email } = req.body;

  const userExist = await Veterinarian.findOne({ email })
  if (userExist) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ img: error.message })
  }
  try {
    const veterinarian = new Veterinarian(req.body);
    const savedVeterninarian = await veterinarian.save();
    res.json(savedVeterninarian)
  } catch (error) {
    console.log(error)
  }
}

const profile = (req, res) => {
  res.json({ msg: "Mostrando perfil" })
}

const confirm = (req, res) => {
  console.log(req.params.token)
  res.json({ msg: "Confirmando cuenta" })
}

export {
  register,
  profile,
  confirm
}
