import { navLinks } from "../constants";
import { styles } from "../styles";
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setToggle } from "../features/navSlice";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { Link } from "react-router-dom";

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
					<AnimatePresence>
						{toggle && (
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="flex flex-col gap-4 md:hidden w-full px-6 py-4 bg-white dark:bg-black shadow-md"
							>
								{navLinks.map((link) => (
									<motion.li
										key={link.id}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -10 }}
										transition={{ duration: 0.2, delay: link.id * 0.05 }}
										className="hover:text-[#1FA9D2] cursor-pointer"
									>
										<Link to={link.path} onClick={() => dispatch(setToggle())}>
											{link.name}
										</Link>
									</motion.li>
								))}
							</motion.div>
						)}
					</AnimatePresence>

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
						{!toggle ? (
							<MdMenu className="w-[18px] h-[18px]" />
						) : (
							<MdClose className="w-[18px] h-[18px]" />
						)}{" "}
					</span>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
