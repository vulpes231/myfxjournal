import React, { useState } from "react";
import { links } from "../constants";
import { styles } from "../styles";
import {
  MdAddChart,
  MdClose,
  MdDarkMode,
  MdLightMode,
  MdMenu,
} from "react-icons/md";

const Navbar = ({ mode, toggleMode }) => {
  const [toggle, setToggle] = useState(false);

  const navLinks = links.map((link) => {
    return (
      <li key={link.id}>
        <a href="">{link.name}</a>
      </li>
    );
  });

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <header
      className={
        mode
          ? `${styles.primary.bgColor} ${styles.primary.textColor} ${styles.primary.padding} w-full`
          : `${styles.secondary.bgColor} ${styles.secondary.textColor} ${styles.primary.padding} w-full`
      }
    >
      <nav className={`flex justify-between items-center`}>
        <span
          className={
            mode
              ? `flex text-xl items-center gap-2 ${styles.primary.textColor}`
              : `flex text-xl items-center gap-2 ${styles.secondary.textColor}`
          }
        >
          <MdAddChart />
          <h1 className="font-bold uppercase">vfx</h1>
        </span>
        <ul
          className={
            toggle
              ? `flex flex-col gap-4 absolute top-[80px] left-0 w-full capitalize `
              : `hidden md:flex gap-4 capitalize`
          }
        >
          {navLinks}
        </ul>
        <span
          className={`hidden md:flex items-center cursor-pointer ${styles.secondary.gap}`}
        >
          <span onClick={toggleMode}>
            {mode ? <MdDarkMode /> : <MdLightMode />}
          </span>
          {/* <button
            className={
              mode
                ? `${styles.primary.border} text-white p-2 cursor-pointer `
                : `${styles.secondary.border}  p-2 cursor-pointer `
            }
          >
            Create Strategy
          </button> */}
        </span>
        {/* hamburger */}
        <span onClick={handleToggle} className="sm:hidden">
          {!toggle ? <MdMenu /> : <MdClose />}{" "}
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
