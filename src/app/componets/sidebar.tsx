import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { FaBars } from "react-icons/fa"; // Hamburger icon
import { useState } from "react";

export function Featured() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <main className="flex gap-x-4 lg:gap-x-20 ml-9">
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed left-2 top-20 z-50 mt-5 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <section
        className={`flex flex-col max-w-[200px] mt-10 fixed lg:static left-0 top-24 bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        role="navigation"
      >
        <h1 className="font-semibold text-sm md:text-2xl">New(500)</h1>
        <div className="font-medium text-[9px] lg:text-sm max-w-[150px] space-y-2 mt-6 flex flex-col">
          <Link href={"/shoes"} aria-label="Shop shoes" className="hover:text-red-500">
            Shoes
          </Link>
          <Link href={"/sports"} aria-label="Shop sports bras" className="hover:text-blue-500">
            Sports Bras
          </Link>
          <Link href={"/top&tshirts"} aria-label="Shop tops and t-shirts" className="hover:text-green-500">
            Tops & T-Shirts
          </Link>
          <Link href={"/hoodies"} aria-label="Shop hoodies and sweatshirts" className="hover:text-yellow-500">
            Hoodies & Sweatshirts
          </Link>
          <Link href={"/jackets"} aria-label="Shop jackets" className="hover:text-purple-500">
            Jackets
          </Link>
          <Link href={"/trousers"} aria-label="Shop trousers and tights" className="hover:text-pink-500">
            Trousers & Tights
          </Link>
          <Link href={"/shorts"} aria-label="Shop shorts" className="hover:text-indigo-500">
            Shorts
          </Link>
          <Link href={"/tracksuits"} aria-label="Shop tracksuits" className="hover:text-teal-500">
            Tracksuits
          </Link>
          <Link href={"/rompers"} aria-label="Shop jumpsuits and rompers" className="hover:text-orange-500">
            Jumpsuits & Rompers
          </Link>
          <Link href={"/skirts"} aria-label="Shop skirts and dresses" className="hover:text-cyan-500">
            Skirts & Dresses
          </Link>
          <Link href={"/socks"} aria-label="Shop socks" className="hover:text-lime-500">
            Socks
          </Link>
          <Link href={"/accessories"} aria-label="Shop accessories and equipment" className="hover:text-amber-500">
            Accessories & Equipment
          </Link>
        </div>

        {/* Gender Section */}
        <div className="mt-10">
          <hr className="border-gray-300" />
          <h1 className="font-semibold flex justify-between items-center text-sm mt-1">
            Gender
            <span>
              <IoIosArrowUp />
            </span>
          </h1>
          <div className="mt-2 text-[9px] lg:text-sm">
            <Link href={"/men"} aria-label="Shop men's clothing" className="flex gap-2 items-center hover:text-gray-700">
              Men
            </Link>
            <Link href={"/women"} aria-label="Shop women's clothing" className="flex gap-2 items-center hover:text-gray-700">
              Women
            </Link>
            <Link href={"/unisex"} aria-label="Shop unisex clothing" className="flex gap-2 items-center hover:text-gray-700">
              Unisex
            </Link>
          </div>
        </div>

        {/* Kids Section */}
        <div className="mt-10">
          <hr className="border-gray-300" />
          <h1 className="font-semibold flex justify-between text-sm items-center mt-1">
            Kids
            <span>
              <IoIosArrowUp />
            </span>
          </h1>
          <div className="mt-2 text-[9px] lg:text-sm">
            <h1 className="flex gap-2 items-center hover:text-gray-700">Boys</h1>
            <h1 className="flex gap-2 items-center hover:text-gray-700">Girls</h1>
          </div>
        </div>

        {/* Sort By Price Section */}
        <Link href={'/displayprice'} aria-label="Sort products by price">
          <div className="mt-10">
            <hr className="border-gray-300" />
            <h1 className="font-semibold flex text-[9px] lg:text-[12px] justify-between items-center mt-1">
              Sort By Price
              <span>
                <IoIosArrowUp />
              </span>
            </h1>
            <div className="mt-2 text-[9px] lg:text-sm">
              <h1 className="flex gap-2 items-center hover:text-gray-700">Under ₹ 2,500.00</h1>
              <h1 className="flex gap-2 items-center hover:text-gray-700">₹ 2,501.00 - ₹ 7,500.00</h1>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
