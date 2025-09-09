import { navLinks } from "../constants";
import { styles } from "../styles";
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setToggle } from "../features/navSlice";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Mobilemenu from "./Mobilemenu";

const Navbar = () => {
	const dispatch = useDispatch();
	const { toggle, darkMode } = useSelector((state) => state.nav);
	return (
		<header
			className={`w-full h-[70px] shadow-sm fixed top-0 z-1 flex items-center bg-white dark:bg-slate-900 text-slate-600 dark:text-gray-300 px-4`}
		>
			<nav
				className={`flex justify-between items-center w-full md:w-[1100px] md:mx-auto`}
			>
				<Logo />

				<ul
					className={`text-[14px] font-medium capitalize ${
						toggle
							? "absolute top-[71px] left-0 w-full flex-col gap-4"
							: "hidden md:flex gap-10 items-center"
					}`}
				>
					<Mobilemenu
						toggle={toggle}
						links={navLinks} // or authLinks
						onClose={() => dispatch(setToggle())}
						variant="main" // or "auth"
					/>
					{/* Desktop links */}
					{!toggle &&
						navLinks.map((link) => (
							<li
								key={link.id}
								className="hidden md:block hover:text-[#1FA9D2] cursor-pointer"
							>
								<Link to={link.path}>{link.name}</Link>
							</li>
						))}
				</ul>

				<div className="flex items-center gap-4">
					<span
						className={`flex items-center cursor-pointer ${styles.secondary.gap}`}
					>
						<span onClick={() => dispatch(setDarkMode())}>
							{darkMode ? (
								<MdDarkMode
									className={`bg-white text-[#333] w-6 h-6 p-1 rounded-[10px]`}
								/>
							) : (
								<MdLightMode
									className={`${styles.button.bgColor} text-[#fff] w-6 h-6 p-1 rounded-[10px]`}
								/>
							)}
						</span>
					</span>
					{/* hamburger */}
					<span onClick={() => dispatch(setToggle())} className="md:hidden">
						{!toggle ? <MdMenu size={22} /> : <MdClose size={22} />}{" "}
					</span>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
