import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import veterinarianRoutes from './routes/veterinarianRoutes.js'
import patientRoutes from './routes/patientRoutes.js'

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use('/api/veterinarians', veterinarianRoutes);
app.use('/api/patients', patientRoutes)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`El servidor funciona en el puerto ${PORT}`)
});
