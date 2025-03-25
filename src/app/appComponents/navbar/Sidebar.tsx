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

  useEffect(() => {
    const body = document.body;
    const originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    const scrollY = window.scrollY;

    if (isOpen) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    } else {
      body.style.overflow = originalStyle.overflow;
      body.style.position = originalStyle.position;
      body.style.top = originalStyle.top;
      body.style.width = originalStyle.width;

      if (body.style.top) {
        window.scrollTo(0, -parseInt(body.style.top || "0"));
        body.style.top = "";
      }
    }

    return () => {
      body.style.overflow = originalStyle.overflow;
      body.style.position = originalStyle.position;
      body.style.top = originalStyle.top;
      body.style.width = originalStyle.width;

      if (body.style.top) {
        window.scrollTo(0, -parseInt(body.style.top || "0"));
        body.style.top = "";
      }
    };
  }, [isOpen]);

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
