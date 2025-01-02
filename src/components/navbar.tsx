// components/Navbar.tsx
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Track Product", href: "/trackproduct" },
    { name: "Add Products", href: "/addproduct" },
    { name: "List All Products", href: "/allproducts" },
    { name: "Update Product", href: "/editproduct" },
    { name: "Delete Product", href: "/removeproduct" },
  ];

  return (
    <nav className="bg-teal-800 p-4">
      <div className="container mx-auto flex justify-around">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href}>
            {" "}
            <span
              className={`text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                pathname === item.href ? "bg-teal-900" : ""
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
