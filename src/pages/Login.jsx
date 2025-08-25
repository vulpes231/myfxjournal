import React, { useEffect, useState } from "react";
import Custominput from "../components/Custominput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Errormodal, Loadingmodal, Successmodal } from "../components";
import { loginUser, resetLogin } from "../features/loginSlice";

const Login = () => {
	const dispatch = useDispatch();
	const initialState = {
		username: "",
		password: "",
	};

	const [form, setForm] = useState(initialState);
	const [error, setError] = useState(null);

	const { darkMode } = useSelector((state) => state.nav);
	const { accessToken, loginLoading, loginError, statusCode } = useSelector(
		(state) => state.login
	);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		for (const key in form) {
			if (form[key] === "") {
				setError(`${key[0].toUpperCase()}${key.slice(1)} required!`);
				return;
			}
		}

		dispatch(loginUser(form));
		console.log(form);
	};

	useEffect(() => {
		if (loginError) {
			setError(loginError);
		}
	}, [loginError]);

	useEffect(() => {
		let timeout;
		if (accessToken) {
			const now = Date.now();
			timeout = setTimeout(() => {
				dispatch(resetLogin());
				sessionStorage.setItem("token", accessToken);
				sessionStorage.setItem("lastLogin", now);
				window.location.href = "/dashboard";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [accessToken]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError(null);
				dispatch(resetLogin());
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

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

					<p className="flex items-center gap-2 justify-center text-[13px] text-[#979797] font-normal">
						Don't have an account?
						<span className="text-blue-500 underline">
							<Link to={"/signup"}>create account</Link>
						</span>
					</p>
				</form>
			</div>
			{loginLoading && (
				<Loadingmodal loadingText={"Signing In"} darkMode={darkMode} />
			)}
			{error && <Errormodal error={error} darkMode={darkMode} />}
			{accessToken && (
				<Successmodal successText={"Login successful"} darkMode={darkMode} />
			)}
		</section>
	);
};

export default Login;
