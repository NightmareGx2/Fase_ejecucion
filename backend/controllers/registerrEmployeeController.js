import employeeModel from "../models/employees.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  const {
    name, 
    email,
    password,
    telephone, 
    address, 
    position, 
    hiring_date, 
    dui
  } = req.body;

  try {
    // Verificación de empleado existente
    const employeeExist = await employeeModel.findOne({ email });
    if (employeeExist) {
      return res.json({ message: "Employee already exist" });
    }

    // Encriptacion
    const passwordHash = await bcryptjs.hash(password, 10);
    const newEmployee = new employeeModel({
      name, 
      email,
      password: passwordHash,
      telephone, 
      address, 
      position, 
      hiring_date, 
      dui
    });

    await newEmployee.save();

    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) console.log("error");

        res.cookie("authToken", token);
        res.json({ message: "Employee registed" });
      }
    );
    
  } catch (error) {
    console.log("error" + error);
    res.json({ message: "Error" });
  }
};

export default registerEmployeeController;
