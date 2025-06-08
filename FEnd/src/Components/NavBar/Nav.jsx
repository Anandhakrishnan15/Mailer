import React from "react";
import { FloatingDock } from "../ui/FloatingDock";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa"; // using FontAwesome from react-icons

import { useAuth } from "../../context/AuthContext"; // global auth context

const Nav = () => {
  const { loggedIn } = useAuth();

  const dockItems = [
    {
      title: "Home",
      icon: <FaHome className="w-full h-full" />,
      href: "/",
    },
    {
      title: "About Us",
      icon: <FaInfoCircle className="w-full h-full" />,
      href: "/about",
    },
    {
      title: "Mail",
      icon: <FaEnvelope className="w-full h-full" />,
      href: "mailto:example@example.com",
    },
    {
      title: "Contact",
      icon: <FaPhone className="w-full h-full" />,
      href: "/contact",
    },
    {
      title: loggedIn ? "Profile" : "Log In / Sign Up",
      icon: <FaUser className="w-full h-full" />,
      href: loggedIn ? "/profile" : "/auth",
    },
  ];

  return (
    <div>
      <FloatingDock
        items={dockItems}
        desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        mobileClassName="fixed bottom-4 right-4 z-50"
      />
    </div>
  );
};

export default Nav;
