import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth(); 


  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection(""); 
      return;
    }

    const handleScroll = () => {
      const sections = ["hero", "events", "about", "contact"];
      let current = "";
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/"); 
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Eventify
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li
            className={`cursor-pointer hover:text-indigo-600 ${
              activeSection === "hero" ? "text-indigo-600 font-semibold" : ""
            }`}
            onClick={() => handleScroll("hero")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer hover:text-indigo-600 ${
              activeSection === "events" ? "text-indigo-600 font-semibold" : ""
            }`}
            onClick={() => handleScroll("events")}
          >
            Events
          </li>
          <li
            className={`cursor-pointer hover:text-indigo-600 ${
              activeSection === "about" ? "text-indigo-600 font-semibold" : ""
            }`}
            onClick={() => handleScroll("about")}
          >
            About
          </li>
          <li
            className={`cursor-pointer hover:text-indigo-600 ${
              activeSection === "contact" ? "text-indigo-600 font-semibold" : ""
            }`}
            onClick={() => handleScroll("contact")}
          >
            Contact
          </li>
        </ul>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <button
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-600">
                {user.email}
              </span>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <span className="text-2xl">&times;</span> : <span className="text-2xl">&#9776;</span>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-lg">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                activeSection === "hero" ? "text-indigo-600 font-semibold" : ""
              }`}
              onClick={() => handleScroll("hero")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                activeSection === "events" ? "text-indigo-600 font-semibold" : ""
              }`}
              onClick={() => handleScroll("events")}
            >
              Events
            </li>
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                activeSection === "about" ? "text-indigo-600 font-semibold" : ""
              }`}
              onClick={() => handleScroll("about")}
            >
              About
            </li>
            <li
              className={`cursor-pointer hover:text-indigo-600 ${
                activeSection === "contact" ? "text-indigo-600 font-semibold" : ""
              }`}
              onClick={() => handleScroll("contact")}
            >
              Contact
            </li>
          </ul>

          <div className="mt-4 flex flex-col space-y-3">
            {!user ? (
              <>
                <button
                  className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-600 text-center">
                  {user.email}
                </span>
                <button
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
