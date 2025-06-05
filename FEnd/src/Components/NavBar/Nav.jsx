import React from 'react'
import { FloatingDock } from '../ui/FloatingDock';
import {
  IconHome,
  IconInfoCircle,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useAuth } from "../../context/AuthContext"; // import context

// import "./NavBar.css"

const Nav = () => {
  const { loggedIn } = useAuth(); // use global login state

  const dockItems = [
    {
      title: "Home",
      icon: <IconHome className="w-full h-full" />,
      href: "/",
    },
    {
      title: "About Us",
      icon: <IconInfoCircle className="w-full h-full" />,
      href: "/about",
    },
    {
      title: "Mail",
      icon: <IconMail className="w-full h-full" />,
      href: "mailto:example@example.com",
    },
    {
      title: "Contact",
      icon: <IconPhone className="w-full h-full" />,
      href: "/contact",
    },
    {
      title: loggedIn ? "Profile" : "Log In / Sign Up",
      icon: <IconUser className="w-full h-full" />,
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
}

export default Nav
