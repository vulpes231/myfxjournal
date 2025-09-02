import React, { useEffect } from "react";

const Trades = () => {
	useEffect(() => {
		document.title = "Journo - Trade History";
	}, []);
	return (
		<section className={`p-6 w-full min-h-screen pt-28 md:pt-20 `}>
			Trades
		</section>
	);
};

export default Trades;
