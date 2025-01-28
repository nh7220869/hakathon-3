"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Acount from "./acount";
import { FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./searchbar";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sm:w-screen">
      {/* Top bar */}
      <div className="bg-[#fafafa] flex justify-between items-center px-6 py-2 md:text-[11px] sm:text-[9px] text-[8px] font-medium text-gray-500">
        <Image src={"/logo1.png"} alt="Logo" width={24} height={24} />
        <div></div>
        <div className="flex md:gap-4 sm:gap-3 gap-2">
          <Link href="/areas" className="hover:text-gray-800" aria-label="Find Link Store">
            Find Link Store
          </Link>
          <Link href="/Performance" className="hover:text-gray-800" aria-label="Find Link Store">
            Standards
          </Link>
          <Link href="/help" className="hover:text-gray-800" aria-label="Help Center">
            Help Center
          </Link>
          <Acount />
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left section (Logo) */}
        <div className="flex items-center">
          <Link href={'/'}>
          <Image src={"/logo2.png"} alt="Nike Logo" width={45} height={50} /></Link>
        </div>

        {/* Center section (Navigation Links) */}
        <nav className="hidden md:flex gap-4 md:gap-6 text-gray-700 font-medium md:text-[16px] sm:text-[14px] text-[10px]">
          <Link href="/products" className="hover:text-black whitespace-nowrap" aria-label="View new and featured products">
            New & Featured
          </Link>
          <Link href="/men" className="hover:text-black whitespace-nowrap" aria-label="Shop men's clothing">
            Men
          </Link>
          <Link href="/Women" className="hover:text-black whitespace-nowrap" aria-label="Shop women's clothing">
            Women
          </Link>
          <Link href="/Kids" className="hover:text-black whitespace-nowrap" aria-label="Shop kids' clothing">
            Kids
          </Link>
          <Link href="/sale" className="hover:text-black whitespace-nowrap" aria-label="Browse sale items">
            Sale
          </Link>
          <Link href="/SNKRS" className="hover:text-black whitespace-nowrap" aria-label="View SNKRS collection">
            SNKRS
          </Link>
        </nav>

        {/* Right section (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <SearchBar />
          </div>

          {/* Wishlist Icon */}
          <Link href={'/wishlist'} className="text-gray-700 md:w-[28px] md:h-[28px] sm:w-[24px] sm:h-[24px] w-[20px] h-[20px] cursor-pointer hover:text-black" aria-label="Go to wishlist">
            <FaHeart className="text-[24px] md:text-[28px] sm:text-[24px]" />
          </Link>

          {/* Cart Icon */}
          <Link href="/Cart" className="text-gray-700 md:w-[28px] md:h-[28px] sm:w-[24px] sm:h-[24px] w-[20px] h-[20px] cursor-pointer hover:text-black" aria-label="Go to shopping cart">
            <FaShoppingBag className="text-[24px] md:text-[28px] sm:text-[24px]" />
          </Link>

          {/* Toggle Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 text-[28px]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="text-[28px]" /> : <FaBars className="text-[28px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="flex flex-col gap-2 bg-[#fafafa] p-4 text-gray-700 font-medium text-sm md:hidden">
          <Link href="/products" className="hover:text-black" aria-label="View new and featured products">
            New & Featured
          </Link>
          <Link href="/men" className="hover:text-black" aria-label="Shop men's clothing">
            Men
          </Link>
          <Link href="/Women" className="hover:text-black" aria-label="Shop women's clothing">
            Women
          </Link>
          <Link href="/Kids" className="hover:text-black" aria-label="Shop kids' clothing">
            Kids
          </Link>
          <Link href="/sale" className="hover:text-black" aria-label="Browse sale items">
            Sale
          </Link>
          <Link href="/SNKRS" className="hover:text-black" aria-label="View SNKRS collection">
            SNKRS
          </Link>
        </nav>
      )}
    </header>
  );
}
