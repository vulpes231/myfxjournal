import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loadingmodal = ({ loadingText = "Loading", isOpen }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="flex flex-col items-center gap-4 bg-white dark:bg-slate-900 px-8 py-6 rounded-2xl shadow-2xl"
					>
						{/* Spinner */}
						<motion.div
							className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#1FA9D2]"
							animate={{ rotate: 360 }}
							transition={{
								repeat: Infinity,
								duration: 1,
								ease: "linear",
							}}
						/>

						{/* Text */}
						<h6 className="text-sm font-medium text-gray-700 dark:text-gray-200">
							{loadingText}...
						</h6>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loadingmodal;
