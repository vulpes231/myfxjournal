import React, { useState } from "react";
import Custominput from "../components/Custominput";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
	const initialState = {
		username: "",
		password: "",
	};

	const { darkMode } = useSelector((state) => state.nav);

	const [form, setForm] = useState(initialState);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
	};

	return (
		<section
			className={`p-6 w-full h-screen mt-[70px] md:mt-[0px] md:flex md:items-center md:justify-center`}
		>
			<div
				className={`flex flex-col gap-6 w-full md:w-[480px] md:mx-auto  md:shadow-sm md:p-10 md:rounded-[10px] ${
					darkMode ? "md:bg-slate-950" : "md:bg-white"
				}`}
			>
				<h3 className="capitalize font-semibold text-[22px] md:text-[26px]">
					sign in to your journal
				</h3>
				<form action="" className="flex flex-col gap-4">
					<Custominput
						type={"text"}
						placeHolder={"username"}
						value={form.username}
						handleChange={handleInput}
						name={"username"}
						label={"username"}
					/>

					<Custominput
						type={"password"}
						placeHolder={"password"}
						value={form.password}
						handleChange={handleInput}
						name={"password"}
						label={"password"}
					/>

					<button
						onClick={handleSubmit}
						className={`${
							darkMode ? "bg-white text-[#333]" : "bg-black text-[#fff]"
						} p-2 h-[40px] capitalize rounded-sm font-semibold text-[14px] md:text-[16px] mt-5`}
					>
						sign in
					</button>

					<p className="flex items-center gap-2">
						Don't have an account?
						<span className="text-blue-500 underline">
							<Link to={"/signup"}>create account</Link>
						</span>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Login;
