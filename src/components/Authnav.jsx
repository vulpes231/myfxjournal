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

const Authnav = () => {
	const dispatch = useDispatch();

	const { toggle, darkMode } = useSelector((state) => state.nav);

	return (
		<header
			className={
				darkMode
					? `${styles.nav.primary.bgColor} ${styles.primary.textColor} ${styles.primary.padding} w-full`
					: `${styles.nav.secondary.bgColor} ${styles.secondary.textColor} ${styles.primary.padding} w-full`
			}
		>
			<nav className={`flex justify-between items-center`}>
				<span
					className={
						darkMode
							? `flex text-xl items-center gap-2 ${styles.primary.textColor}`
							: `flex text-xl items-center gap-2 ${styles.secondary.textColor}`
					}
				>
					<img src={logo} alt="" className="w-[40px]" />
					<h1 className="font-bold uppercase text-[20px]">Journo</h1>
				</span>
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
					<span
						// className={`${darkMode ? "bg-white" : "bg-black"}`}
						onClick={() => dispatch(setDarkMode())}
					>
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
					{!toggle ? <MdMenu /> : <MdClose />}{" "}
				</span>
			</nav>
		</header>
	);
};

export default Authnav;
