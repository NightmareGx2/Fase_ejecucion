import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },

    telephone: {
      type: Date,
      require: true,
    },

    address: {
      type: String,
    },

    password: {
      type: String,
      require: true,
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

export default model("customers", customersSchema);
