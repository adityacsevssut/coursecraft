import React, { useEffect, useRef, useState } from "react";
import { navbarStyles } from "../../assets/dummyStyles";
import logo from "../../assets/logo.jpg";
import {
  BookMarked,
  BookOpen,
  BookOpenText,
  Contact,
  Home,
  Menu,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth, useClerk, UserButton, useUser } from "@clerk/clerk-react";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
  { name: "Attendance", icon: BookOpen, href: "/attendance-tracker" },
  { name: "CGPA", icon: BookOpen, href: "/calculate-cgpa" },
  { name: "About", icon: BookMarked, href: "/about" },
  { name: "Contact", icon: Contact, href: "/contact" },
  { name: "Study", icon: BookOpenText, href: "/mycourses" },
];

const Navbar = () => {
  // for clerk
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  // for mobile toggle
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const menuRef = useRef(null);
  const isLoggedIn = isSignedIn && Boolean(localStorage.getItem("token"));

  //   fetch token
  useEffect(() => {
    const loadToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        localStorage.setItem("token", token);
        console.log("Clerk Login Token:", token);
      }
    };
    loadToken();
  }, [isSignedIn, getToken]);

  //   remove token when signout
  useEffect(() => {
    if (!isSignedIn) {
      localStorage.removeItem("token");
      console.log("Clerk Token Removed");
    }
  }, [isSignedIn]);

  // INSTANT token removal using Clerk logout event
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      console.log("Token removed instantly on Clerk logout event");
    };

    window.addEventListener("user:signed_out", handleLogout);
    return () => window.removeEventListener("user:signed_out", handleLogout);
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const desktopLinkClass = (isActive) =>
    `px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-900/30" : "text-gray-300 hover:text-white hover:bg-gray-800"}`;

  const mobileLinkClass = (isActive) =>
    `flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${isActive ? "bg-blue-900/30 border border-blue-800/50" : "hover:bg-gray-800"}`;

  return (
    <nav
      className={`${navbarStyles.navbar} ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden
        } ${isScrolled ? navbarStyles.navbarScrolled : navbarStyles.navbarDefault
        } `}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* LOGO */}
          <div className="flex items-center space-x-3 group cursor-pointer flex-shrink-0 mr-4">
            <img src={logo} alt="Logo" className=" w-12 h-12" />
            <div
              className=" text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-700
             to-cyan-600 font-serif leading-[0.95]"
            >
              CourseCraft
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-center flex-grow max-w-7xl mx-2">
            <div className="flex items-center justify-center w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-inner border border-gray-800">
              <div className="flex space-x-2 w-full justify-center">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) => desktopLinkClass(isActive)}
                    >
                      <div className=" flex items-center space-x-2">
                        <Icon size={16} className="text-gray-400 transition-colors duration-300 group-hover:text-blue-400" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                          {item.name}
                        </span>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
            {!isSignedIn ? (
              <button
                type="button"
                onClick={() => openSignUp({})}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-lg hover:shadow-blue-900/50 transform transition-all duration-300 group border border-transparent"
              >
                <span>Create Account</span>
              </button>
            ) : (
              <div className=" flex items-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}

            {/* toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-900 shadow-sm border border-gray-800 text-gray-300 hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* mobile nav */}
          <div
            className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div
            ref={menuRef}
            className={`lg:hidden transition-all duration-500 overflow-hidden absolute top-full left-0 right-0 z-50 ${isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-b-2xl p-4 shadow-xl border border-gray-800 border-t-0">
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) => mobileLinkClass(isActive)}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-gray-800 transition-colors duration-300 group-hover:bg-blue-900/30">
                        <Icon size={18} className="text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-200">
                        {item.name}
                      </span>
                    </NavLink>
                  );
                })}

                {!isSignedIn ? (
                  <button
                    type="button"
                    onClick={() => {
                      openSignUp({});
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
                  >
                    <span>Create Account</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center px-4 py-3 bg-gray-800/50 rounded-xl mt-4">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={navbarStyles.backgroundPattern}>
          <div className={navbarStyles.pattern}></div>
        </div>
      </div> {/* This closes the main container div */}
    </nav>
  );
};

export default Navbar;
