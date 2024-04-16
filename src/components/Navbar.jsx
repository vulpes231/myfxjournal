import React, { useState } from "react";
import { links } from "../constants";
import { styles } from "../styles";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = ({ mode, toggleMode }) => {
  const navLinks = links.map((link) => {
    return (
      <li key={link.id}>
        <a href="">{link.name}</a>
      </li>
    );
  });
  return (
    <header
      className={
        mode
          ? `${styles.primary.bgColor} ${styles.primary.textColor} ${styles.primary.padding} w-full`
          : `${styles.secondary.bgColor} ${styles.secondary.textColor} ${styles.primary.padding} w-full`
      }
    >
      <nav className={`flex justify-between items-center`}>
        <span>myfxjournal</span>
        <ul className={`flex gap-4 capitalize`}>{navLinks}</ul>
        <span
          className={`hidden md:flex items-center cursor-pointer ${styles.secondary.gap}`}
        >
          <span onClick={toggleMode}>
            {mode ? <MdDarkMode /> : <MdLightMode />}
          </span>
          <button
            className={
              mode
                ? `${styles.primary.border} p-2 cursor-pointer ${styles.secondary.borderRadius}`
                : `${styles.secondary.border} p-2 cursor-pointer ${styles.secondary.borderRadius}`
            }
          >
            Create Strategy
          </button>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
