import mongoose from "mongoose";

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
  },
  confirm: {
    type: Boolean,
    default: false,
  }
});

const Veterinarian = mongoose.model("Veterinarian", veterinarianSchema);
export default Veterinarian;
