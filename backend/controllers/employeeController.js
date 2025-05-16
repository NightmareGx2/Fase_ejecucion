const employeesController = {};
import employeeModel from "../models/employee.js";

// SELECT
employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

// INSERT
employeeController.createemployee = async (req, res) => {
  const { name, email, password, telephone, address, position, hiring_date, dui } = req.body;
  const newemployee= new employeeModel({ name, email, password, telephone, address, position, hiring_date, dui });
  await newemployee.save();
  res.json({ message: "employee save" });
};

// DELETE
employeeController.deleteemployee = async (req, res) => {
const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
employeeController.updateemployee = async (req, res) => {
  const { name, email, password, telephone, address, position, hiring_date, dui } = req.body;
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      name, 
      email,
      password,
      telephone, 
      address, 
      position, 
      hiring_date, 
      dui
    },
    { new: true }
  );

  res.json({ message: "employee update" });
};

export default employeeController;