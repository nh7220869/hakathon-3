// pages/under-construction.tsx
import Link from 'next/link';
import { FC } from 'react';

const UnderConstruction: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-center text-white">
      <div className="text-6xl font-bold mb-6">
        <span className="block">🚧</span>
        Under Construction
      </div>
      <p className="text-xl mb-8">
        We’re working hard to bring you something awesome. Check back soon!
      </p>
      <div className="flex space-x-8 mb-8">
        <Link
          href="https://twitter.com"
          className="text-3xl hover:text-gray-400 transition"
        >
          <i className="fab fa-twitter"></i>
        </Link>
        <Link
          href="https://facebook.com"
          className="text-3xl hover:text-gray-400 transition"
        >
          <i className="fab fa-facebook-f"></i>
        </Link>
        <Link
          href="https://instagram.com"
          className="text-3xl hover:text-gray-400 transition"
        >
          <i className="fab fa-instagram"></i>
        </Link>
      </div>
      <Link
        href="/"
        className="px-6 py-3 text-xl text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition"
      >
        Back to Home
      </Link>
      <div className="mt-6">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
