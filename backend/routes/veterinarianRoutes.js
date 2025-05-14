import express from "express";
import { register, profile, confirm } from "../controllers/veterinarianController.js";

const router = express.Router();

router.post('/', register);

router.get('/profile', profile);

router.get('/confirm/:token', confirm);

export default router;
