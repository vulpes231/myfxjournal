import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Mobilemenu = ({ toggle, links, onClose, variant = "main" }) => {
	// Container animation
	const containerVariants = {
		hidden: { opacity: 0, y: -30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 120,
				damping: 20,
				when: "beforeChildren",
				staggerChildren: 0.08,
			},
		},
		exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
	};

	// Item animation
	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -10 },
	};

	return (
		<AnimatePresence>
			{toggle && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black md:hidden"
						onClick={onClose}
					/>

					{/* Dropdown */}
					<motion.ul
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="absolute top-[70px] left-4 right-4 z-50 flex flex-col gap-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl px-6 py-6 md:hidden"
					>
						{links.map((link) => (
							<motion.li
								key={link.id}
								variants={itemVariants}
								className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-[#1FA9D2] cursor-pointer transition"
							>
								<Link
									to={link.path}
									onClick={(e) => {
										// For auth links that need hard redirect, prevent router
										if (variant === "auth") {
											e.preventDefault();
											window.location.href = link.path;
										}
										onClose();
									}}
								>
									{link.name}
								</Link>
							</motion.li>
						))}
					</motion.ul>
				</>
			)}
		</AnimatePresence>
	);
};

export default Mobilemenu;
