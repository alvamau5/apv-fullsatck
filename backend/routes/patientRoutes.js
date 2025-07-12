import express from "express";
import {
  addPatient,
  getPatient
} from "../controllers/patientController";
const router = express.Router();

router.route('/').get(addPatient).post(getPatient)

export default router;
