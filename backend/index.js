import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import veterinarianRoutes from "./routes/veterinarianRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();
dotenv.config();
connectDB();

const allowedDomains = process.env.FRONTEND_URL;

/* Al hacer una peticion de url diferente del backend con
 * el frontend almacenara el dominio qu hace la peticion
 */
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (allowedDomains.indexOf(origin) != -1) {
      //the origin of the request is allowed
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/veterinarians", veterinarianRoutes);
app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`El servidor funciona en el puerto ${PORT}`);
});
