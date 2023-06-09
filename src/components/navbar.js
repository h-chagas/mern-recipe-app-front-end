import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    //function to logout. Will set cookies to empty string, remove userID from local storage, and will navigate to /auth page
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="pancake with berries on the top of it"
            className="w-20 h-20 rounded-full border-solid border-4 border-blue-700"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setNavbar(!navbar)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <div
          className={`w-full md:block md:w-auto ${
            navbar ? "p-8 md:p-0 block" : "hidden"
          }`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 bg-blue-50 rounded md:bg-transparent md:text-blue-700 md:p-0"
                onClick={() => setNavbar(!navbar)}
              >
                Home
              </Link>
            </li>

            {!cookies.access_token ? ( //If logged in, will show Log out button, else will show Login/Register Link anchor
              <Link
                to="/auth"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                onClick={() => setNavbar(!navbar)}
              >
                Login/Register
              </Link>
            ) : (
              <>
                <li>
                  <Link
                    to="/create-recipe"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    onClick={() => setNavbar(!navbar)}
                  >
                    Create Recipe
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saved-recipes"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    onClick={() => setNavbar(!navbar)}
                  >
                    Saved Recipes
                  </Link>
                </li>
                <button onClick={logout}>Log out</button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
