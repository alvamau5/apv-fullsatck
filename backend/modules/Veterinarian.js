import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from '../helpers/generateId.js';

const veterinarianSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: generateId(),
  },
  confirm: {
    type: Boolean,
    default: false,
  }
});

veterinarianSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next(); return
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

veterinarianSchema.methods.checkPassword = function(
  passwordForm
) {
  return bcrypt.compareSync(passwordForm, this.password);
}

const Veterinarian = mongoose.model("Veterinarian", veterinarianSchema);
export default Veterinarian;
