import React, { useEffect, useState } from "react";
import Custominput from "../components/Custominput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Errormodal, Loadingmodal, Successmodal } from "../components";
import { resetRegisterUser, signupUser } from "../features/registerSlice";
import { styles } from "../styles";

const Register = () => {
	const dispatch = useDispatch();

	const initialState = {
		username: "",
		password: "",
		email: "",
		firstname: "",
		lastname: "",
		phone: "",
	};

	const [form, setForm] = useState(initialState);
	const [error, setError] = useState(null);

	const { darkMode } = useSelector((state) => state.nav);
	const { registerUserLoading, registerUserError, userRegistered } =
		useSelector((state) => state.register);

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

		dispatch(signupUser(form));
		console.log(form);
	};

	useEffect(() => {
		if (registerUserError) {
			setError(registerUserError);
		}
	}, [registerUserError]);

	useEffect(() => {
		let timeout;
		if (userRegistered) {
			timeout = setTimeout(() => {
				dispatch(resetRegisterUser());
				window.location.href = "/";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [userRegistered]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError(null);
				dispatch(resetRegisterUser());
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	return (
		<section
			className={`p-6 w-full min-h-screen mt-[70px] md:mt-[0px] md:flex md:items-center md:justify-center pb-20 md:pb-0`}
		>
			<div
				className={`flex flex-col gap-6 w-full md:w-[520px] md:mx-auto  md:shadow-sm md:p-10 md:rounded-[10px] ${
					darkMode ? "md:bg-slate-950" : "md:bg-white"
				}`}
			>
				<h3 className="capitalize font-semibold text-[22px] md:text-[24px] leading-8 tracking-wider">
					Get started on your journal management journey
				</h3>
				<form action="" className="flex flex-col gap-4">
					<div className={styles.formHolder}>
						<Custominput
							type={"text"}
							// placeHolder={"firstname"}
							value={form.firstname}
							handleChange={handleInput}
							name={"firstname"}
							label={"first name"}
						/>

						<Custominput
							type={"lastname"}
							// placeHolder={"lastname"}
							value={form.lastname}
							handleChange={handleInput}
							name={"lastname"}
							label={"last name"}
						/>
					</div>
					<div className={styles.formHolder}>
						<Custominput
							type={"text"}
							// placeHolder={"username"}
							value={form.username}
							handleChange={handleInput}
							name={"username"}
							label={"username"}
						/>

						<Custominput
							type={"password"}
							// placeHolder={"password"}
							value={form.password}
							handleChange={handleInput}
							name={"password"}
							label={"password"}
						/>
					</div>
					<div className={styles.formHolder}>
						<Custominput
							type={"text"}
							placeHolder={"youremail@example.com"}
							value={form.email}
							handleChange={handleInput}
							name={"email"}
							label={"email"}
						/>
						<Custominput
							type={"text"}
							placeHolder={""}
							value={form.phone}
							handleChange={handleInput}
							name={"phone"}
							label={"phone (optional)"}
						/>
					</div>

					<button
						onClick={handleSubmit}
						className={`${
							darkMode ? "bg-white text-[#333]" : "bg-black text-[#fff]"
						} p-2 h-[40px] capitalize rounded-sm font-semibold text-[14px] md:text-[16px] mt-5`}
					>
						sign up
					</button>

					<p className="flex items-center gap-2 justify-center text-[13px] text-[#979797] font-normal">
						Already have an account?
						<span className="text-blue-500 underline">
							<Link to={"/"}>Login now</Link>
						</span>
					</p>
				</form>
			</div>
			{registerUserLoading && (
				<Loadingmodal loadingText={"Signing In"} darkMode={darkMode} />
			)}
			{error && <Errormodal error={error} darkMode={darkMode} />}
			{userRegistered && (
				<Successmodal
					successText={"Registration successful"}
					darkMode={darkMode}
				/>
			)}
		</section>
	);
};

export default Register;
