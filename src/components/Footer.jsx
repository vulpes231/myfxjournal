import React from "react";
import { footerLinks } from "../constants";
import Custominput from "./Custominput";
import Logo from "./Logo";

const Footer = () => {
	return (
		<footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 px-6 md:px-12 py-10">
			<div className="grid gap-10 md:grid-cols-4">
				{/* Brand & About */}
				<div className="md:col-span-2 space-y-4">
					<Logo />
					<p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
						Journo is a modern journal built for forex traders to record,
						organize, and review their trades with ease. It goes beyond simple
						note-taking by providing powerful analytics through detailed trade
						history. With Journo, traders can identify patterns, measure
						performance, and refine strategies, making it an essential tool for
						consistent growth and trading discipline.
					</p>
				</div>
				{/* Newsletter */}
				<div className="space-y-3">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						Stay Updated
					</h3>
					<Custominput />
					<button className="w-full h-[44px] bg-[#1FA9D2] hover:bg-[#178BB0] text-white font-semibold rounded-md transition-colors">
						Subscribe
					</button>
				</div>
				{/* Helpful Links */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
						Helpful Links
					</h3>
					<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc pl-4">
						{footerLinks.map((link) => (
							<li
								key={link.id}
								className="hover:text-[#1FA9D2] transition-colors cursor-pointer capitalize "
							>
								<a href="#">{link.name}</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Bottom copyright */}
			<div className="mt-10 border-t border-gray-200 dark:border-slate-700 pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
				© {new Date().getFullYear()} Journo. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
