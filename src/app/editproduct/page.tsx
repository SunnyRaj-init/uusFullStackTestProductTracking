"use client";
import { useState, FormEvent } from "react";
import Loading from "./loading"; // Import the Loading component
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || ""; // Get the product ID from the URL if it exists
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the request starts
    const form = event.currentTarget; // Get the form element
    const formData = new FormData(form); // set form datat to current data inputted
    //getting elements values from form data
    const id = formData.get("id");
    const name = formData.get("name");
    const description = formData.get("description");
    const sourceLocation = formData.get("sourceLocation");
    const currentLocation = formData.get("currentLocation");
    const destinationLocation = formData.get("destinationLocation");
    //creating the payload/body
    const payload = {
      name: name,
      description: description,
      sourceLocation: sourceLocation,
      currentLocation: currentLocation,
      destinationLocation: destinationLocation,
    };
    //hitting the api
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    // Handle response
    const status = await response.status;
    if (status == 200) {
      const data = await response.json();
      alert(`Product has been updated id:${data.product.id}`);
      form.reset(); // Reset the form
    } else if (status == 404) {
      alert("Requested Product doesnt exist!");
      form.reset(); // Reset the form
    } else if (status == 400) {
      alert("Bad Request!");
      form.reset(); // Reset the form
    } else {
      alert("OOPS! Something went wrong at our end :(");
      form.reset(); // Reset the form
    }
    setIsLoading(false); //resetting loading state
  }
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading /> // Render the Loading component when isLoading is true
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col max-w-md mx-auto mt-8 p-4 border border-teal-400 rounded-lg content-center"
        >
          <h1 className="text-2xl font-bold mb-4 self-center">
            Update Product
          </h1>
          <div className="flex items-center mb-4">
            <label htmlFor="id" className="mr-4 w-1/4">
              Product ID:
            </label>
            <input
              type="text"
              name="id"
              placeholder="Product ID"
              required={true}
              className="w-3/4 mb-2 p-2 border rounded text-stone-950"
              defaultValue={id}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="name" className="mr-4 w-1/4">
              Name:
            </label>
            <input
              type="text"
              name="name"
              minLength={3}
              maxLength={30}
              placeholder="3-30 characters"
              required={false}
              className="w-3/4 mb-2 p-2 border rounded text-stone-950"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="description" className="mr-4 w-1/4">
              Description:
            </label>
            <textarea
              name="description"
              rows={2}
              minLength={5}
              maxLength={70}
              placeholder="5-70 characters"
              required={false}
              className="w-3/4 mb-2 p-2 border rounded text-stone-950"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="sourceLocation" className="mr-4 w-1/4">
              Source Address:
            </label>
            <textarea
              name="sourceLocation"
              rows={2}
              minLength={5}
              maxLength={70}
              placeholder="5-70 characters"
              required={false}
              className="w-3/4 mb-2 p-2 border rounded text-stone-950"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="currentLocation" className="mr-4 w-1/4">
              Current Address:
            </label>
            <textarea
              name="currentLocation"
              rows={2}
              minLength={5}
              maxLength={70}
              placeholder="5-70 characters"
              required={false}
              className="w-3/4 mb-2 p-2 border rounded text-stone-950"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="destinationLocation" className="mr-4 w-1/4">
              Destination Address:
            </label>
            <textarea
              name="destinationLocation"
              rows={2}
              minLength={5}
              maxLength={70}
              placeholder="5-70 characters"
              required={false}
              className="w-3/4 mb-2 p-2 border rounded text-stone-950"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Update
          </button>
        </form>
      )}
    </>
  );
};

export default page;
