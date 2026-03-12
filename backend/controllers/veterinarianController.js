import Veterinarian from "../modules/Veterinarian.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import emailRegister from "../helpers/emailRegister.js";
import emailForgetPassword from "../helpers/emailForgetPassword.js";

const register = async (req, res) => {
  const { email, name } = req.body;

  // Prevenir usuarios registrados
  const userExist = await Veterinarian.findOne({ email });
  if (userExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const veterinarian = new Veterinarian(req.body);
    const savedVeterninarian = await veterinarian.save();

    emailRegister({
      email,
      name,
      token: savedVeterninarian.token,
    });

    res.json(savedVeterninarian);
  } catch (error) {
    console.log(error);
  }
};

const profile = (req, res) => {
  const { veterinarian } = req; //Accedes a la infromacion del usuario
  res.json(veterinarian);
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await Veterinarian.findOne({ token });

  if (!userConfirm) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  console.log(userConfirm);

  try {
    userConfirm.token = null;
    userConfirm.confirm = true;
    await userConfirm.save();
    res.json({ msg: "Usuario confirmado correctamente..." });
  } catch (error) {
    console.log(error);
  }
};

const authenticate = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  // Comprobar si el usuario exite.
  const user = await Veterinarian.findOne({ email });
  if (!user) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si la cuenta esta confirmada
  if (!user.confirm) {
    const error = new Error("Tu cuenta no ah sido confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Autenticar password
  if (await user.checkPassword(password)) {
    // Autenticar
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const existVeterinarian = await Veterinarian.findOne({ email });
  if (!existVeterinarian) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existVeterinarian.token = generateId();
    await existVeterinarian.save();

    emailForgetPassword({
      email,
      name: existVeterinarian.name,
      token: existVeterinarian.token,
    });

    res.json({
      msg: "Hemos enviado un email con las instrucciones",
    });
  } catch (error) {
    console.log(error);
  }
};

const checkPassword = async (req, res) => {
  const { token } = req.params;

  // console.log(token)

  const validateToken = await Veterinarian.findOne({ token });

  if (validateToken) {
    res.json("Token valido y el usuario existe");
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  // console.log(token)
  const { password } = req.body;

  const veterinarian = await Veterinarian.findOne({ token });
  if (!veterinarian) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinarian.token = null;
    veterinarian.password = password;
    // console.log(veterinarian)
    await veterinarian.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const veterinarian = await Veterinarian.findById(id);

  if (!veterinarian) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  const { email } = req.body;
  if (veterinarian.email !== req.body.email) {
    const existEmail = await Veterinarian.findOne({ email })

    if (existEmail) {
      const error = new Error('Este email ya esta en uso');
      return res.status(400).json({ msg: error.message });
    }
  }


  try {

    const { name, email, web, phone, password } = req.body;
    veterinarian.name = name;
    veterinarian.email = email;
    veterinarian.web = web;
    veterinarian.phone = phone;
    veterinarian.password = password;

    const updatedVeterinarian = await veterinarian.save();
    res.json(updatedVeterinarian);
  } catch (error) {
    console.log(error)
  }
}

const updatePassword = async (req, res) => {
  // console.log(req.veterinarian)
  // console.log(req.body)

  // Read data
  const { id } = req.veterinarian;
  const { pwd_current, pwd_new } = req.body;

  try {
    // Checkauth the veterinarian exists
    const veterinarian = await Veterinarian.findById(id)
    if (!veterinarian) {
      const error = new Error('Usuario no encontrado')
      return res.status(400).json({ msg: error.message })
    }

    // Validate current password 
    const isMathc = await veterinarian.checkPassword(pwd_current)
    if (isMathc) {
      // console.log('correcto')

      // Update password (el middleware pre('save') del modelo se carga del has)
      veterinarian.password = pwd_new;
      await veterinarian.save();
      res.json({ msg: 'El password se a guardado con exito' })
    } else {
      // console.log('incorrecto')
      const error = new Error('El password nuevo debe ser diferente al actual')
      return res.json({ msg: error.message })
    }
  } catch (error) {
    console.log(error)
  }
}

export {
  register,
  profile,
  confirm,
  authenticate,
  forgetPassword,
  checkPassword,
  newPassword,
  updateProfile,
  updatePassword
};
