
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import toast from "react-hot-toast";

 const RegisterPage = () => {

	const navigate = useNavigate();

	const [form, setForm] = useState({
		fullName :"",
		username : "",
		password :"",
	});

	const handleClick = async()=>{
		
		let {fullName,username, password} = form;

		if(Object.values(form).some(val => val =="")){
			return toast.error("All Fields are required");
		}

		if(password.length <=5){
			return toast.error("Password must be min 6 char")
		}

		let register = {
			fullName,
			username,
			password
		};

		try {
			let res = await api.post("/user", register);
			if(res.data.message){
                toast.success(res.data.message);
				setTimeout(()=>{
					navigate("/");
				},1500)
            }     
		} catch (error) {
			toast.error(error?.response?.data?.message || error?.message, {duration:2000})
		}
	}

    return (
	<main className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
		<section className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute top-32 right-20 w-20 h-20 bg-white opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
			<div className="absolute bottom-32 left-20 w-20 h-20 bg-white opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
		</section>

		<section className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 w-full max-w-md transform hover:scale-[1.02] transition-all duration-300">
			<div className="text-center mb-2">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg transform -rotate-3 hover:-rotate-6 transition-transform">
					<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0M3 20a6 6 0 0112 0v1H3v-1z" />
					</svg>
				</div>
				<h1 className="text-2xl font-bold bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
					Hey, Not Yet Joined<b> SprintDo </b>?
				</h1>
				<p className="text-gray-600">Start organizing your life today</p>
			</div>

			<form onSubmit={(e)=> e.preventDefault()} className="space-y-2">
				<div className="space-y-2">
					<label className="block text-sm font-semibold text-gray-700">Full Name</label>
					<input
						type="text"
						name="fullName"
						value={form.fullName}
						onChange={(e)=> {
							let val = e.target.value;
							val = val.charAt(0).toUpperCase() + val.slice(1);
							setForm({...form, fullName:val})
						}}
						className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white outline-none transition-all duration-200"
						placeholder="Foo Bear"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-semibold text-gray-700">Username</label>
					<input
						type="text"
						minLength={6}
						value={form.username}
						onChange={(e)=> setForm({...form , username:e.target.value.trim()})}
						className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white outline-none transition-all duration-200"
						placeholder="foobear"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-semibold text-gray-700">Password</label>
					<input
						type="password"
						value={form.password}
						minLength={6}
						onChange={(e)=> setForm({...form , password:e.target.value})}
						className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white outline-none transition-all duration-200"
						placeholder="Min. 6 characters"
					/>
				</div>

				<button
					onClick={handleClick}
					className="w-full cursor-pointer bg-linear-to-r from-pink-600 to-orange-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
				>
					Create Account
				</button>
			</form>

			<div className="mt-4 text-center">
				<p className="text-gray-600"> Already have an account ?
					<Link to={"/"}
						className="text-pink-600 font-bold hover:text-orange-600 transition-colors"
					>
						&nbsp; Sign in
					</Link>
				</p>
			</div>
		</section>
	</main>
	);
};

  export default RegisterPage;