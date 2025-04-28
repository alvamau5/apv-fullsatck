import Veterinarian from "../modules/Veterinarian.js"

const register = async (req, res) => {
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

export {
  register,
  profile
}
