import { authLinks } from "../constants";
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
import Logo from "./Logo";

const Authnav = () => {
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
					className={`${
						toggle
							? `flex flex-col gap-4 absolute top-[80px] left-0 w-full capitalize `
							: `hidden md:flex gap-8 capitalize`
					} text-[14px] font-medium`}
				>
					{authLinks.map((link) => {
						return (
							<li key={link.id}>
								<a href="">{link.name}</a>
							</li>
						);
					})}
				</ul>
				<span
					className={`hidden md:flex items-center cursor-pointer ${styles.secondary.gap}`}
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
				<span onClick={() => dispatch(setToggle())} className="sm:hidden">
					{!toggle ? <MdMenu /> : <MdClose />}{" "}
				</span>
			</nav>
		</header>
	);
};

export default Authnav;
