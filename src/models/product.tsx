// /src/models/product.tsx
//Product Model
//this file defines the product model and creates one if it doesnt exist!
import { model, models, Schema } from "mongoose";

export interface IProduct {
  name: String;
  description: String;
  currentLocation: String;
  sourceLocation: String;
  destinationLocation: String;
}

//defining the schema
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please provide the name of the product"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description of the product"],
    },
    currentLocation: {
      type: String,
      required: [true, "Please provide the current location of the product"],
    },
    sourceLocation: {
      type: String,
      required: [true, "Please provide the source location of the product"],
    },
    destinationLocation: {
      type: String,
      required: [
        true,
        "Please provide the destination location of the product",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);

//use the existing model if not present create a new model named Product using the defined schema above - ProductSchema and utilize this new model!
const Product = models.Product || model("Product", ProductSchema);

export default Product;
