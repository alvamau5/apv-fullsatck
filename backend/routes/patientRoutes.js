import express from "express"
const router = express.Router();
import {
  addPatient,
  getPatients
} from "../controllers/patientController.js";
import checkAuth from "../middleware/authMiddleware.js"

router.route('/')
  .post(checkAuth, addPatient).
  get(checkAuth, getPatients);

export default router;
