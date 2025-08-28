import { navLinks } from "../constants";
import { styles } from "../styles";
import {
	MdAddChart,
	MdClose,
	MdDarkMode,
	MdLightMode,
	MdMenu,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setToggle } from "../features/navSlice";
import { logo } from "../assets";
import { useState } from "react";

const Navbar = () => {
	const dispatch = useDispatch();
	const { toggle, darkMode } = useSelector((state) => state.nav);
	return (
		<header
			className={`${
				darkMode
					? `${styles.nav.primary.bgColor} ${styles.primary.textColor} ${styles.primary.padding} `
					: `${styles.nav.secondary.bgColor} ${styles.secondary.textColor} ${styles.primary.padding}`
			} w-full h-[70px] shadow-sm fixed top-0 z-1 flex items-center`}
		>
			<nav
				className={`flex justify-between items-center w-full md:w-[1100px] md:mx-auto`}
			>
				<span
					className={
						darkMode
							? `flex text-xl items-center gap-2 ${styles.primary.textColor}`
							: `flex text-xl items-center gap-2 ${styles.secondary.textColor}`
					}
				>
					<img src={logo} alt="" className="w-[40px]" />
					<h1 className="font-bold uppercase">journo</h1>
				</span>
				<ul
					className={`${
						toggle
							? `flex flex-col gap-4 absolute top-[80px] left-0 w-full capitalize `
							: `hidden md:flex gap-10 items-center capitalize`
					} text-[14px] font-medium text-[#505050]`}
				>
					{navLinks.map((link) => {
						return (
							<li key={link.id} className="hover:text-[#1FA9D2]">
								<a href="">{link.name}</a>
							</li>
						);
					})}
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
									className={`${styles.button.primary.bgColor} text-[#fff] w-6 h-6 p-1 rounded-[10px]`}
								/>
							)}
						</span>
					</span>
					{/* hamburger */}
					<span onClick={() => dispatch(setToggle())} className="sm:hidden">
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
