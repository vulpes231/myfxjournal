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

const Navbar = () => {
	const dispatch = useDispatch();
	const { toggle, darkMode } = useSelector((state) => state.nav);
	return (
		<header
			className={`${
				darkMode
					? `${styles.primary.bgColor} ${styles.primary.textColor} ${styles.primary.padding} `
					: `${styles.secondary.bgColor} ${styles.secondary.textColor} ${styles.primary.padding}`
			} w-full h-[70px] shadow-sm fixed top-0 z-1`}
		>
			<nav className={`flex justify-between items-center`}>
				<span
					className={
						darkMode
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
					{navLinks.map((link) => {
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
						{darkMode ? <MdDarkMode /> : <MdLightMode />}
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
			</nav>
		</header>
	);
};

export default Navbar;
