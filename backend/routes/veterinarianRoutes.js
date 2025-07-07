import express from "express";
const router = express.Router();
import {
  register,
  profile,
  confirm,
  authenticate,
  forgetPassword,
  checkPassword,
  newPassword
} from "../controllers/veterinarianController.js";
import checkAuth from '../middleware/authMiddleware.js'

// public area
router.post('/', register);
router.get('/confirm/:token', confirm);
router.post('/login', authenticate);
router.post('/forget-password', forgetPassword);
router.route('forget-password/:token').get(checkPassword).post(newPassword);

// private area
router.get('/profile', checkAuth, profile);

export default router;
