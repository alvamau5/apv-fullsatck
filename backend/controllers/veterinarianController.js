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

const confirm = async (req, res) => {
  const { token } = req.params
  const userConfirm = await Veterinarian.findOne({ token })

  if (!userConfirm) {
    const error = new Error('Token no valido');
    return res.status(404).json({ msg: error.message });
  }

  console.log(userConfirm)

  try {
    userConfirm.token = null;
    userConfirm.confirm = true
    await userConfirm.save()
    res.json({ msg: "Usuario confirmado correctamente..." })
  } catch (error) {
    console.log(error)
  }
  // res.json({ msg: "Usuario confirmado correctamente" })
}

const authenticate = async (req, res) => {
  // console.log(req.body);
  const { email } = req.body

  // Comprobar si el usuario exite.
  const user = await Veterinarian.findOne({ email })
  if (!user) {
    const error = new Error('El Usuario no existe');
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si la cuenta esta confirmada
  if (!user.confirm) {
    const error = new Error('Tu cuenta no ah sido confirmada');
    return res.status(403).json({ msg: error.message });
  }

  // Autenticar al usuario
}

export {
  register,
  profile,
  confirm,
  authenticate
}
