import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import customersModel from "../models/customers.js";
import employeesModel from "../models/employees.js";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound; 
    let userType; 

   
    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
    
      userFound = await employeesModel.findOne({ email });
      userType = "employee";

     
      if (!userFound) {
        userFound = await customersModel.findOne({ email });
        userType = "client";
      }
    }

  
    if (!userFound) {
      return res.json({ message: "user not found" });
    }

    
    if (userType !== "Administrador") {
      const isMatch = bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        res.json({ message: "Invalid password" });
      }
    }

    //
    jsonwebtoken.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
  }
};

export default loginController;
