d// Importo todo lo de la libreria de Express
import express from "express";
import PeliculasRoutes from "./routes/peliculas.js";
import customersRoutes from "./src/routes/Customers.js";
import employeeRoutes from "./src/routes/Employees.js";
import registerEmployeesRoutes from "./src/routes/registerEmployee.js";
import cookieParser from "cookie-parser";
import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import registerClientsRouter from "./routes/registerClient.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";

// Creo una constante que es igual a la libreria que importé
const app = express();
//s
//Que acepte datos en json
app.use(express.json());
// Para que postman guarde el token en una cookie
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", PeliculasRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/registerEmployee", registerEmployeesRoutes);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/registerClients", registerClientsRouter);
app.use("/api/RecoveryPassword", recoveryPasswordRoutes);

// Exporto la constante para poder usar express en otros archivos
export default app;
