const customersController = {};
import customersModel from "../models/customers.js";
// SELECT
customersController.getcustomers = async (req, res) => {
  const customers = await customersModel.find();
  res.json(customers);
};

// INSERT
customersController.createcustomers = async (req, res) => {
  const { name, email, telephone, address, password, dui } = req.body;
  const newcustomers = new customersModel({ name, email, telephone, address, password, dui});
  await newcustomers.save();
  res.json({ message: "customer save" });
};

// DELETE
customersController.deletecustomers = async (req, res) => {
const deletedcustomers = await customersModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "customer dont find" });
  }
  res.json({ message: "customer deleted" });
};

//Update
customersController.updatecustomers = async (req, res) => {

  const { name, email, telephone, address, password, dui} = req.body;
  
  await customersModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
        email,
        telephone,
        address,
        password,
        dui
    },
    { new: true }
  );
  res.json({ message: "customer update" });
};

export default customersController;
