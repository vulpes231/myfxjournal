import React from "react";
import { logo } from "../assets";

const Footer = () => {
	return (
		<footer className="bg-[#fff] dark:bg-[#333] dark:text-[#fff]">
			<div>
				<span>
					<img src={logo} alt="" className="w-[40px] h-[40px]" />
					<h3>Journo</h3>
				</span>
				<h6>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa deserunt
					ducimus sint asperiores corporis distinctio vitae eaque delectus a!
					Quibusdam voluptate porro iste! Magni in amet, quod ad rem possimus
					totam sint officia aliquam suscipit assumenda et debitis aliquid
					maxime!
				</h6>
			</div>
			<div>
				<h3>helpful links</h3>
			</div>
		</footer>
	);
};

export default Footer;
