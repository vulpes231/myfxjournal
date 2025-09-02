import { useEffect } from "react";
import Content from "../components/Dashcontent";
import Navbar from "../components/Navbar";

import { styles } from "../styles";
import { useSelector } from "react-redux";

const Dash = () => {
	const { darkMode } = useSelector((state) => state.nav);

	useEffect(() => {
		document.title = "Journo - Dashboard";
	}, []);
	return (
		<section
			className={
				darkMode
					? `${styles.primary.bgColor} ${styles.primary.textColor} min-h-screen w-full`
					: `${styles.secondary.bgColor} ${styles.secondary.textColor} min-h-screen w-full`
			}
		>
			{/* <hr className={darkMode ? `text-[#fff]` : `text-[#333]`} /> */}
			<Content />
		</section>
	);
};

export default Dash;
