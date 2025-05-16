import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      require: true, 
    },

    email: {
      type: String,
    },

    password: {
      type: Date,
      require: true,
      min: 0,
    },

    telephone: {
      type: String,
    },

    address: {
      type: String,
    },

    position: {
      type: String,
      require: true,
    },
    hiring_date: {
      type: Date,
    },

    dui: {
      type: String,
      require: true,
    },
},
{
  timestamps: true,
  strict: false,
}
);

export default model("employees", employeesSchema);
