import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(["under-decoration", null, null]);
  const location = useLocation();

  const reff = { "/": 0, "/create": 1, "/user": 2 };

  useEffect(() => {
    const pathindex = reff[location.pathname];
    const arr = active.map((item, index) =>
      pathindex === index ? "under-decoration" : null
    );
    setActive(arr);
    // eslint-disable-next-line
  }, [location]);

  return (
    <div className="flex items-center px-4 py-4 text-white font-cairo bg-sportblack">
      <div className="mr-6">
        <Link to="/" className="text-4xl font-semibold">
          ExcerciseTracker
        </Link>
      </div>
      <div className="flex">
        <Link
          to="/"
          className={`mr-4 ${active[0]} transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-sportbrown`}
        >
          Excercise
        </Link>
        <Link
          to="/create"
          className={`mr-4 ${active[1]} transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-sportbrown`}
        >
          Create Excercise Log
        </Link>
        <Link
          to="/user"
          className={`mr-4 ${active[2]} transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-sportbrown`}
        >
          Create User
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
