const styles = {
	nav: {
		primary: {
			bgColor: "bg-slate-950/70",
		},
		secondary: {
			bgColor: "bg-[#fff]",
		},
	},
	primary: {
		bgColor: "",
		textColor: "text-[#fff]",
		border: "border-2 border-[#fff]",
		padding: "p-6",
		gap: "gap-6",
		lineHeight: "leading-6",
		borderRadius: "rounded-lg",
		fontSize: "text-2xl",
		fontWeight: "font-semibold",
	},
	secondary: {
		bgColor: "bg-slate-50",
		textColor: "text-[#333]",
		border:
			"border border-[#9f9f9f] focus:border-2 focus:outline-none placeholder:capitalize",
		padding: "p-4",
		gap: "gap-4",
		lineHeight: "leading-4",
		borderRadius: "rounded-md",
		fontSize: "text-xl",
		fontWeight: "font-thin",
	},
	utils: {
		outline: "outline-none",
		outline: "border-none",
	},
	formHolder: "flex flex-col gap-2 md:flex-row gap-4",
	button: {
		bgColor:
			"bg-[#1FA9D2] hover:bg-[#1FA9D2]/50 text-white cursor-pointer shadow-sm",
	},
	text: {
		primary: {
			textColor: "text-[#1FA9D2]",
		},
		// secondary: {
		// 	textColor: "text-[#fff]",
		// },
	},
	select:
		"w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-[40px] md:h-[48px]",
	table: {
		th: "font-bold text-[14px] md:text-[16px] px-4 py-3 whitespace-nowrap text-center",
		td: "font-medium text-[12px] md:text-[14px] px-4 py-3 whitespace-nowrap text-center",
	},
};

export { styles };
