import React, { useEffect, useState } from "react";
import Custominput from "../components/Custominput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Errormodal, Loadingmodal, Successmodal } from "../components";
import { loginUser, resetLogin } from "../features/loginSlice";
import { styles } from "../styles";

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
		<section className={`p-6 w-full h-screen pt-28 md:pt-32`}>
			<div
				className={`flex flex-col gap-6 w-full md:w-[480px] md:mx-auto  md:shadow-md md:p-10 md:rounded-[10px] mb-10 md:mt-10 md:bg-[#fff] md:dark:bg-slate-900`}
			>
				<h3 className="font-bold text-[22px] md:text-[26px]">
					Sign in to your Journal.
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
						className={`w-full h-[44px] md:h-[48px] px-4 py-2 capitalize rounded-md font-semibold text-sm md:text-base text-white bg-[#1FA9D2] hover:bg-[#178BB0] active:bg-[#137490] dark:bg-[#1FA9D2] dark:hover:bg-[#178BB0] shadow-sm transition-all duration-200 ease-in-out mt-5`}
					>
						Sign in
					</button>

					<p className="flex items-center gap-2 justify-center text-[13px] text-[#979797] font-normal ">
						Don't have an account?
						<span className={`${styles.text.primary.textColor} underline`}>
							<Link to={"/signup"}>Create account</Link>
						</span>
					</p>
				</form>
			</div>
			{loginLoading && <Loadingmodal loadingText={"Signing In"} />}
			{error && <Errormodal error={error} />}
			{accessToken && <Successmodal successText={"Login successful"} />}
		</section>
	);
};

export default Login;
