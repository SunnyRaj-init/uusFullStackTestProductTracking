"use client";
import { useState, FormEvent } from "react";
import Loading from "./loading"; // Import the Loading component
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || ""; // Get the product ID from the URL if it exists
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!confirm("Are you sure you want to delete this product?")) {
      return; // Cancel deletion if user doesn't confirm
    }
    setIsLoading(true); // Set loading to true when the request starts
    const form = event.currentTarget; // Get the form element
    const formData = new FormData(form); // set form datat to current data inputted
    //getting elements values from form data
    const id = formData.get("id");
    //hitting the api
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    // Handle response
    const status = await response.status;
    if (status == 200) {
      const data = await response.json();
      alert(data.message);
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
            Remove Product
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
          <button
            type="submit"
            disabled={isLoading}
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-400 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Remove
          </button>
        </form>
      )}
    </>
  );
};

export default page;
