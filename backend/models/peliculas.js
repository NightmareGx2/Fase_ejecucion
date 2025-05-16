import { Schema, model } from "mongoose";

const peliculasSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },

    description: {
      type: String,
    },

    director: {
      type: String,
      require: true,
    },

    gender: {
      type: String,
    },

    year: {
      type: Number,
    },
    duration: {
        type: Number,
      },
      image: {
        type: String
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("customers", peliculasSchema);
