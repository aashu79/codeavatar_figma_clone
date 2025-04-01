"use client";
import { useState, useRef, useEffect } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { Button } from "../../components/ui/button";
import Logo from "../appComponents/common/Logo";
import MenuItems from "../appComponents/navbar/MenuItems";
import SearchBar from "../appComponents/navbar/SearchBar";
import Sidebar from "../appComponents/navbar/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      id: 1,
      title: "Menu Item",
      hasSubmenu: true,
      submenuItems: [
        { id: "sub-1", title: "Submenu Item 1" },
        { id: "sub-2", title: "Submenu Item 2" },
        { id: "sub-3", title: "Submenu Item 3" },
        { id: "sub-4", title: "Submenu Item 4" },
        { id: "sub-5", title: "Submenu Item 5" },
        { id: "sub-6", title: "Submenu Item 6" },
        { id: "sub-7", title: "Submenu Item 7" },
        { id: "sub-8", title: "Submenu Item 8" },
        { id: "sub-9", title: "Submenu Item 9" },
        { id: "sub-10", title: "Submenu Item 10" },
        { id: "sub-11", title: "Submenu Item 11" },
        { id: "sub-12", title: "Submenu Item 12" },
      ],
    },
    {
      id: 2,
      title: "Menu Item",
      hasSubmenu: false,
    },
    {
      id: 3,
      title: "Menu Item",
      hasSubmenu: true,
      submenuItems: [
        { id: "sub-8", title: "Submenu Item 1" },
        { id: "sub-9", title: "Submenu Item 2" },
        { id: "sub-10", title: "Submenu Item 3" },
      ],
    },
    {
      id: 4,
      title: "Menu Item",
      hasSubmenu: false,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const globalState = useSelector((state: RootState) => state.globalState);
  const {
    siteVisitors: { totalVisits },
  } = globalState;

  return (
    <div className="relative z-50 bg-white" ref={navbarRef}>
      <nav className="flex flex-col ">
        {/* Desktop Navbar */}
        <div className="hidden lg:flex justify-between items-center px-12 py-4 w-full border-b">
          <section className="flex items-center gap-8">
            <Logo />

            <SearchBar />
            <MenuItems menuItems={menuItems} />
          </section>
          <section>
            <Button>Button</Button>
          </section>
        </div>

        {/* Tablet Navbar */}
        <div className="hidden md:flex lg:hidden justify-between gap-8 items-center px-12 py-4 w-full border-b">
          <Logo />
          <div className="flex-1">
            <SearchBar />
          </div>
          <Button>Button</Button>
        </div>

        {/* Mobile Navbar */}
        <div className="flex md:hidden justify-between gap-8 items-center px-[20px] py-4 w-full border-b">
          <Logo />
          <div className="flex items-center gap-3">
            <Button>Button</Button>
            <button
              onClick={toggleSidebar}
              className="bg-white h-[38px] w-[38px] flex justify-center items-center rounded-[8px] border-2 hover:cursor-pointer"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            >
              {isSidebarOpen ? (
                <BiX className="text-2xl" />
              ) : (
                <BiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Tablet Menu Items */}
        <div className="mx-auto hidden md:flex lg:hidden">
          <MenuItems menuItems={menuItems} />
        </div>
      </nav>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menuItems={menuItems}
        navbarHeight={navbarHeight}
      />
    </div>
  );
};

export default Navbar;
