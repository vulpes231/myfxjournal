import { motion } from "framer-motion";
import React from "react";
// motion
const Loadingmodal = ({ loadingText, darkMode }) => {
	return (
		<div
			className={`fixed top-[70px] left-0 z-10 w-full h-screen flex flex-col items-center justify-center bg-black/20 dark:bg-white/20`}
		>
			<div className="">
				<motion.div
					className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
					animate={{ rotate: 360 }}
					transition={{
						repeat: Infinity,
						duration: 1,
						ease: "linear",
					}}
				/>
				<h6>{loadingText}...</h6>
			</div>
		</div>
	);
};

export default Loadingmodal;
