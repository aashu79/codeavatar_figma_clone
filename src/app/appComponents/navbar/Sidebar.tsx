"use client";
import { AnimatePresence, motion } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";
import { MenuItem } from "../../../types/globalTypes";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  navbarHeight: number;
}

const Sidebar = ({
  isOpen,
  onClose,
  menuItems,
  navbarHeight,
}: SidebarProps) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleMenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  // Enhanced body scroll lock when sidebar is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    const originalTop = window.getComputedStyle(document.body).top;
    const scrollY = window.scrollY;

    if (isOpen) {
      // Save current scroll position and lock the body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore original styles and scroll position
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;

      // Only scroll if we had stored a position
      if (document.body.style.top) {
        const scrollY = parseInt(document.body.style.top || "0") * -1;
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      }
    }

    return () => {
      // Clean up - restore original body style
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = "";

      // Restore scroll position on unmount
      if (document.body.style.top) {
        const scrollY = parseInt(document.body.style.top || "0") * -1;
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      }
    };
  }, [isOpen]);

  // Prevent event propagation to parent elements
  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay that sits behind the sidebar but above content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30"
            style={{ top: `${navbarHeight}px` }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 w-full bg-white shadow-xl z-40 "
            style={{
              top: `${navbarHeight}px`,
              height: `calc(100vh - ${navbarHeight}px)`,
            }}
            onClick={handleSidebarClick}
          >
            <div className="h-full flex flex-col">
              {/* Sidebar Content */}
              <div className="flex-1 bg-white overflow-y-auto">
                <div className="flex flex-col">
                  {menuItems?.map((menu: MenuItem) => (
                    <div
                      key={menu.id}
                      className="flex flex-col text-base w-[90%]   mx-auto "
                    >
                      <div
                        onClick={() =>
                          menu.hasSubmenu && toggleMenu(menu.id.toString())
                        }
                        className={`w-full px-5 py-4 flex items-center justify-between rounded-[8px] ${
                          expandedMenu === menu.id.toString()
                            ? "bg-[#18181B] text-white"
                            : "text-[#262626]"
                        } ${
                          menu.id !== menuItems[0].id
                            ? "border-t border-[#E5E5E5]"
                            : ""
                        }`}
                      >
                        <span className="text-base font-medium">
                          {menu.title}
                        </span>
                        {menu.hasSubmenu && (
                          <motion.div
                            animate={{
                              rotate:
                                expandedMenu === menu.id.toString() ? 180 : 0,
                            }}
                          >
                            <BiChevronDown className="w-6 h-6" />
                          </motion.div>
                        )}
                      </div>

                      {menu.hasSubmenu && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{
                            height:
                              expandedMenu === menu.id.toString() ? "auto" : 0,
                          }}
                          className="overflow-hidden "
                        >
                          <div className="flex flex-col">
                            {menu?.submenuItems?.map((sub, index) => (
                              <div
                                key={sub.id}
                                className={`px-5 py-4 text-base my-[8px] text-[#404040]  text-left rounded-[8px] hover:bg-[#18181B] hover:text-white`}
                              >
                                {sub.title}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
