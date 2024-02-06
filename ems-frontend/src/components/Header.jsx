import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-slate-950 p-4">
      <div className="container mx-auto flex justify-start gap-12 items-center">
        <Link to="/" className="text-white text-xl font-bold">Employee Management System</Link>

        <div className="space-x-4">
          <Link to="/employees" className="text-white">Employee</Link>
          <Link to="/departments" className="text-white">Department</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;