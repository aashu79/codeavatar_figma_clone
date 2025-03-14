"use client";
import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ScrollArea } from "../../../components/ui/scroll-area";

const MenuItems = () => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

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

  const handleToggleSubmenu = (id: number) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <div className="flex items-center gap-6">
      {menuItems.map((item) => (
        <div key={item.id}>
          {item.hasSubmenu ? (
            <DropdownMenu
              onOpenChange={() => handleToggleSubmenu(item.id)}
              open={openSubmenu === item.id}
            >
              <DropdownMenuTrigger className="py-2 px-3 cursor-pointer hover:bg-black hover:text-white rounded-[8px]">
                <div className="flex items-center ">
                  <p className="text-sm">{item.title}</p>
                  <span className="ml-1">
                    {openSubmenu === item.id ? (
                      <RiArrowDropUpLine size={22} />
                    ) : (
                      <RiArrowDropDownLine size={22} />
                    )}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <ScrollArea className="h-auto max-h-40">
                  {item.submenuItems?.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.id}
                      className=" cursor-pointer p-2.5 hover:!bg-gray-200"
                    >
                      {subItem.title}
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="py-2 px-3 cursor-pointer hover:bg-black hover:text-white rounded-[8px]">
              <div className="flex items-center cursor-pointer">
                <p className="text-sm">{item.title}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
