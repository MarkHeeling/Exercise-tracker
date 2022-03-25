import React from "react";
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:space-x-10">
            <Link to="/">Home</Link>
            <Link
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange hover:bg-orange"
              to="/login"
            >
              Inloggen
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
