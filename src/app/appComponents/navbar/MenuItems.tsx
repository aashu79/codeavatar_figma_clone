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
import { MenuItem } from "../../../types/globalTypes";

const MenuItems = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

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
              <DropdownMenuContent
                align="start"
                className="w-48 scale-positioned"
              >
                <ScrollArea className="h-auto max-h-40 ">
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
