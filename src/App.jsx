import React, { useState } from "react";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

import { styles } from "./styles";

const App = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleMode = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <section
      className={
        isDark
          ? `${styles.primary.bgColor} ${styles.primary.textColor} min-h-screen w-full`
          : `${styles.secondary.bgColor} ${styles.secondary.textColor} min-h-screen w-full`
      }
    >
      <Navbar mode={isDark} toggleMode={toggleMode} />
      <hr className={isDark ? `text-[#fff]` : `text-[#333]`} />
      <Content />
    </section>
  );
};

export default App;
