// /src/app/api/products/route.ts
// this file creates routes and their respective handlers for the product collection
import dbConnect from "@/lib/db";
import Product from "@/models/product";
import { productdto } from "@/dto/product.dto";
import { NextRequest, NextResponse } from 'next/server';

// handler and route for POST req to /api/products
// we will add a new product when we receive a POST request at products
export async function POST(req: NextRequest){
    try{
        await dbConnect();
        const content:productdto=await req.json();
        console.log("content",content)
        if(content.name && content.description && content.currentLocation && content.destinationLocation && content.sourceLocation){
            //creating a new product
            const product=await Product.create(content)
            return NextResponse.json(  
                { product, message: 'Product created and added' },  
                { status: 201 },  
            );
        }
        return NextResponse.json({ message: 'Product content is missing' }, { status: 400});
    }catch (error) {  
        return NextResponse.json({ message: error }, { status: 400 });  
    }
}

// handler and route for GET req to /api/products
// we will list or retrive all the products when we receive a GET request at products
export async function GET() {  
    try {  
        await dbConnect();  
        const products = await Product.find();  
        return NextResponse.json({ data: products },{status:200});  
    } catch (error) {  
        return NextResponse.json({ error });  
    }  
}