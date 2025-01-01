//Home Component - maps to '/' route or the base route
//enables navigation to other routes
import Link from 'next/link'
export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col gap-4 p-4 justify-center items-center content-center mt-16 border border-teal-400 rounded-lg">
      <Link href="/trackproduct">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Track a Product
        </button>
        </Link>
        <Link href="/allproducts">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          List all Products
        </button>
        </Link>
        <Link href="/addproduct">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Add a New Product
        </button>
        </Link>
        <Link href="/editproduct">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Update a Product
        </button>
        </Link>
        <Link href="/removeproduct">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete a Product
        </button>
        </Link>
      </div>
    </div>
  );
}
