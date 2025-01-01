// /src/app//api/products/[id]/route.ts
// this file creates routes and handles for a product with a specific id using slugs in NEXTJS

import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { updateproductdto } from "@/dto/updateproduct.dto";
import { NextRequest, NextResponse } from "next/server";

// route and handle for GET request at /api/products/:id
// we just get or retrive the specified product by product id
export async function GET(_: NextRequest, context: { params: { id: string } }) {
  try {
    //wait for params
    const params = await context.params;
    const id = await params.id;
    //connect to db
    await dbConnect();
    //use mongoose to find product by id in params
    const product = await Product.findById(id);
    if (product) {
      //product exists return the product
      return NextResponse.json({ product });
    }
    //object not found return 404
    return NextResponse.json(
      { message: `Product ${id} not found` },
      { status: 404 }
    );
  } catch (error) {
    //unable to connect to db or badrequest
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

// route and handle for PUT request at /api/products/:id
// we just update the product if it exists
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    //wait for params
    const params = await context.params;
    const id = await params.id;
    //connect to db
    await dbConnect();
    //use mongoose to find product by id in params
    const product = await Product.findById(id);
    if (product) {
      //fit the data into the update product dto
      const content: updateproductdto = await req.json();
      //set product name to content name if name exists in content
      if (content.name) {
        product.name = content.name;
      }
      //set product description to content description if description exists in content
      if (content.description) {
        product.description = content.description;
      }
      //set product sourceLocation to content sourceLocation if sourceLocation exists in content
      if (content.sourceLocation) {
        product.sourceLocation = content.sourceLocation;
      }
      //set product currentLocation to content currentLocation if currentLocation exists in content
      if (content.currentLocation) {
        product.currentLocation = content.currentLocation;
      }
      //set product name to content name if name exists in content
      if (content.name) {
        product.name = content.name;
      }
      //set product destinationLocation to content destinationLocation if destinationLocation exists in content
      if (content.destinationLocation) {
        product.destinationLocation = content.destinationLocation;
      }
      //save or update the product to its provided new content in the db
      product.save();
      //update successful return status 200
      return NextResponse.json({ product }, { status: 200 });
    }
    //product not Found return status 404
    return NextResponse.json(
      { message: `Product ${id} not found` },
      { status: 404 }
    );
  } catch (error) {
    //unable to connect to db or badrequest
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

// route and handle for DELETE request at /api/products/:id
// we just delete teh specified product by id if it exists
export async function DELETE(
  _: NextRequest,
  context: { params: { id: string } }
) {
  try {
    //wait for params
    const params = await context.params;
    const id = await params.id;
    //connect to db
    await dbConnect();
    //use mongoose to find product by id in params
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndDelete(product._id);
      //deletion successful return status 200
      return NextResponse.json(
        { message: `Product ${id} has been deleted` },
        { status: 200 }
      );
    }
    //product not found return 404
    return NextResponse.json(
      { message: `Product ${id} not found` },
      { status: 404 }
    );
  } catch (error) {
    //unable to connect to db or badrequest
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
