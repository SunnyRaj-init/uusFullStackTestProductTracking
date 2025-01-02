// src/app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { updateproductdto } from "@/dto/updateproduct.dto";

// route and handle for GET request at /api/products/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Use mongoose to find product by id
    const product = await Product.findById(id);
    if (product) {
      // Product exists, return the product
      return NextResponse.json({ product });
    }

    // Object not found, return 404
    return NextResponse.json({ message: `Product ${id} not found` }, { status: 404 });
  } catch (error) {
    // Unable to connect to db or bad request
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

// route and handle for PUT request at /api/products/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Use mongoose to find product by id
    const product = await Product.findById(id);
    if (product) {
      // Fit the data into the update product dto
      const content: updateproductdto = await req.json();

      // Update product fields with new content if it exists
      if (content.name) product.name = content.name;
      if (content.description) product.description = content.description;
      if (content.sourceLocation) product.sourceLocation = content.sourceLocation;
      if (content.currentLocation) product.currentLocation = content.currentLocation;
      if (content.destinationLocation) product.destinationLocation = content.destinationLocation;

      // Save or update the product in the database
      await product.save();

      // Update successful, return status 200
      return NextResponse.json({ product }, { status: 200 });
    }

    // Product not found, return status 404
    return NextResponse.json({ message: `Product ${id} not found` }, { status: 404 });
  } catch (error) {
    // Unable to connect to db or bad request
    return NextResponse.json({ message: error }, { status: 400 });
  }
}

// route and handle for DELETE request at /api/products/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    // Connect to the database
    await dbConnect();

    // Use mongoose to find product by id
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndDelete(product._id);
      // Deletion successful, return status 200
      return NextResponse.json({ message: `Product ${id} has been deleted` }, { status: 200 });
    }

    // Product not found, return status 404
    return NextResponse.json({ message: `Product ${id} not found` }, { status: 404 });
  } catch (error) {
    // Unable to connect to db or bad request
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
