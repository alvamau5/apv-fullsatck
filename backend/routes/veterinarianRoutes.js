import express from "express";
import { 
register,
profile,
confirm,
authenticate
} from "../controllers/veterinarianController.js";

const router = express.Router();

router.post('/', register);

router.get('/profile', profile);

router.get('/confirm/:token', confirm);

router.post('/login', authenticate);

export default router;
