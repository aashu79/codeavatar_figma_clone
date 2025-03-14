import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Logo from "../appComponents/common/Logo";
import { FaXTwitter } from "react-icons/fa6";
import ResponsiveScaler from "../appComponents/ResponsiveScaler";

const Footer = () => {
  const socialLinks = [
    { icon: <FaXTwitter size={20} />, url: "#", ariaLabel: "Twitter" },
    { icon: <FaLinkedin size={20} />, url: "#", ariaLabel: "LinkedIn" },
    { icon: <FaInstagram size={20} />, url: "#", ariaLabel: "Instagram" },
  ];

  const legalLinks = [
    { text: "Privacy Policy", url: "#" },
    { text: "Terms & Conditions", url: "#" },
  ];

  const columns = [
    {
      title: "TITLE",
      names: [
        "Adrian Martinez",
        "Morgan Bianchi",
        "Casey Wagner",
        "Alexei Varga",
        "Maxime Dupont",
        "Jordan Kovacs",
        "Alex Novak",
        "Sasha Schmidt",
        "Alex Reyes",
      ],
    },
    {
      title: "TITLE",
      names: [
        "Jamie Nilsson",
        "Alex Novak",
        "Jordan Kovacs",
        "Alexei Varga",
        "Sasha Schmidt",
        "Casey Wagner",
        "Alex Reyes",
        "Maxime Dupont",
      ],
    },
    {
      title: "TITLE",
      names: ["Morgan Bianchi", "Casey Wagner", "Sasha Schmidt"],
    },
  ];

  return (
    <footer className="border-t border-b standard-footer bg-white w-full ">
      <div className="py-[32px] px-[48px]">
        {/* Main Footer Content */}
        <section className="flex gap-[376px] border-gray-200">
          {/* Logo and Description Column */}
          <div className="w-[376px]">
            <div className="flex items-center mb-4">
              <Logo />
            </div>

            <p className="text-sm text-gray-600 mb-6">
              When I worked as a web designer, I was fascinated by how design
              trends changed each year. Since hang
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={link.ariaLabel}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns Section */}

          <section className="grid grid-cols-3  w-full">
            {columns.map((column, columnIndex) => (
              <div className="w-full  max-w-[284px]" key={columnIndex}>
                <h3 className="font-medium text-gray-800 mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.names.map((name, nameIndex) => (
                    <li key={nameIndex} className="text-gray-600 text-sm">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </section>

        {/* Copyright and Legal Links */}
        <section className="flex justify-between items-center pt-[calc(6px*var(--ui-scale-inverse))] border-t-[2px] mt-[calc(40px*var(--ui-scale-inverse))]">
          <div className="text-gray-600 text-sm">
            © Productname 2025. All rights reserved
          </div>
          <div className="flex space-x-[calc(6px*var(--ui-scale-inverse))]">
            {legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-gray-600 text-sm hover:text-gray-800"
              >
                {link.text}
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
