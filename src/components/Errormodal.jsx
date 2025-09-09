import React from "react";
import { MdClose, MdErrorOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Errormodal = ({ error, onClose, isOpen }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="fixed top-20 right-4 z-50 w-[320px] rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-red-200 dark:border-red-800"
				>
					<div className="flex items-start gap-3 p-4">
						{/* Icon */}
						<div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
							<MdErrorOutline size={22} />
						</div>

						{/* Text */}
						<div className="flex-1">
							<h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
								Error
							</h3>
							<p className="mt-1 text-sm text-gray-700 dark:text-gray-300 leading-snug">
								{error}
							</p>
						</div>

						{/* Close button */}
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
						>
							<MdClose size={18} />
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Errormodal;
