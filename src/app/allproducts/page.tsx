"use client";
// app/products/page.tsx

import React, { useEffect, useState } from "react";
import Loading from "./loading"; // Import the Loading component
import Link from "next/link";
import Navbar from "@/components/Navbar";

// Define the Product type
type Product = {
  id: string;
  name: string;
  description: string;
  sourceLocation: string;
  currentLocation: string;
  destinationLocation: string;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Set loading to true when the request starts
      const response = await fetch("/api/products", { method: "GET" });
      const status = await response.status;
      if (status == 200) {
        const data = await response.json();
        setProducts(data.data);
      } else if (status == 400) {
        alert("Bad Request object");
      } else {
        alert("OOPS! Something went wrong at our end :(");
      }
      setIsLoading(false); //resetting loading state
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading /> // Render the Loading component when isLoading is true
      ) : (
        <div className="flex flex-col max-w-3xl mx-auto px-4 py-8 justify-center items-center content-center">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          {products.length === 0 ? (
            <h4 className="text-xl text-red-500">
              Oops! No products available to list/track.
            </h4>
          ) : (
            <div className="flex flex-col w-full gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-teal-400 p-4 rounded-lg shadow-md"
                >
                  <h2 className="text-lg text-black font-semibold mb-4">
                    {product.name}
                  </h2>
                  <div className="flex w-full gap-1">
                    <h3 className="w-1/4 text-md text-black font-semibold">
                      Product ID:
                    </h3>
                    <h3 className="text-lg text-black font-semibold">
                      {product.id}
                    </h3>
                  </div>
                  <div className="flex w-full gap-1">
                    <label className="w-1/4 text-md text-black font-semibold">
                      Product Description:
                    </label>
                    <p className="text-stone-950 font-semibold mb-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex w-full gap-1">
                    <label className="w-1/4 text-md text-black font-semibold">
                      Source Address:
                    </label>
                    <p className="text-black font-bold w-3/4">
                      {product.sourceLocation}
                    </p>
                  </div>
                  <div className="flex w-full gap-1">
                    <label className="w-1/4 text-md text-black font-semibold">
                      Current Address:
                    </label>
                    <p className="text-black font-bold w-3/4">
                      {product.currentLocation}
                    </p>
                  </div>
                  <div className="flex w-full gap-1">
                    <label className="w-1/4 text-md text-black font-semibold">
                      Destination Address:
                    </label>
                    <p className="text-black font-bold w-3/4">
                      {product.destinationLocation}
                    </p>
                  </div>
                  <div className="flex w-full gap-4 mt-4 justify-between">
                    <Link
                      href={{
                        pathname: "/editproduct",
                        query: { id: product.id },
                      }}
                    >
                      <button
                        type="button"
                        className="text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Edit
                      </button>
                    </Link>
                    <Link
                      href={{
                        pathname: "/removeproduct",
                        query: { id: product.id },
                      }}
                    >
                      <button
                        type="button"
                        className="text-black bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Delete
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
