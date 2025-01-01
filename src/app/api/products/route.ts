// /src/app/api/products/route.ts
// this file creates routes and their respective handlers for the product collection
import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { productdto } from "@/dto/product.dto";
import { NextRequest, NextResponse } from "next/server";

// handler and route for POST req to /api/products
// we will add a new product when we receive a POST request at products
export async function POST(req: NextRequest) {
  try {
    //connect to db
    await dbConnect();
    // fit the given product into the dto and generate an object
    const content: productdto = await req.json();
    // we only proceed to create the prodcut if the provided content object has all the required fields
    if (
      content.name &&
      content.description &&
      content.currentLocation &&
      content.destinationLocation &&
      content.sourceLocation
    ) {
      //creating a new product
      const product = await Product.create(content);
      return NextResponse.json(
        { product, message: "Product created and added" },
        { status: 201 }
      );
    }
    //improper payload
    return NextResponse.json(
      { message: "Product content is missing" },
      { status: 400 }
    );
  } catch (error) {
    //unable to connect to db or badrequest
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

// handler and route for GET req to /api/products
// we will list or retrive all the products when we receive a GET request at products
export async function GET() {
  try {
    //connect to db
    await dbConnect();
    // finding the product through mongoose
    const products = await Product.find();
    //200 if find is successsful
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    //unable to connect to db or badrequest
    return NextResponse.json({ error });
  }
}
