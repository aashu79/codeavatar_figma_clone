import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const MenuItems = () => {
  const menuItems = [
    {
      id: 1,
      title: "Menu Item",
      icon: <RiArrowDropDownLine size={22} />,
    },
    {
      id: 2,
      title: "Menu Item",
      icon: null,
    },
    {
      id: 3,
      title: "Menu Item",
      icon: null,
    },
    {
      id: 4,
      title: "Menu Item",
      icon: null,
    },
  ];

  return (
    <div className="flex items-center gap-[25px]">
      {menuItems.map((item) => (
        <div key={item.id} className="py-[8px] px-[12px] hover:bg-gray-200">
          <div className="flex items-center cursor-pointer  rounded-md">
            <p className="text-sm ">{item.title}</p>
            {item.icon && <span>{item.icon}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
