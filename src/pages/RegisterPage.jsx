
import { useState } from "react";

 const RegisterPage = () => {
	
	const [username, setUsername] = useState('');
	const [fullname, setFullname] = useState('');
	const [password, setPassword] = useState('');


    return (
	<div className="min-h-screen flex items-center justify-center p-4" style={{
		background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
	}}>
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute top-32 right-20 w-20 h-20 bg-white opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
			<div className="absolute bottom-32 left-20 w-20 h-20 bg-white opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
		</div>

		<div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 w-full max-w-md transform hover:scale-[1.02] transition-all duration-300">
			<div className="text-center mb-2">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg transform -rotate-3 hover:-rotate-6 transition-transform">
					<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3mz-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
					</svg>
				</div>
				<h1 className="text-2xl font-bold bg-linear-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
					Join Us
				</h1>
				<p className="text-gray-600">Start organizing your life today</p>
			</div>

			<form onSubmit={(e)=> e.preventDefault()} className="space-y-2">

				<div className="space-y-2">
					<label className="block text-sm font-semibold text-gray-700">Full Name</label>
					<input
					type="text"
					value={fullname}
					onChange={(e) => setFullname(e.target.value)}
					className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white outline-none transition-all duration-200"
					placeholder="John Doe"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-semibold text-gray-700">Username</label>
					<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white outline-none transition-all duration-200"
					placeholder="johndoe"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-semibold text-gray-700">Password</label>
					<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:bg-white outline-none transition-all duration-200"
					placeholder="Min. 6 characters"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-linear-to-r from-pink-600 to-orange-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
				>
					Create Account
				</button>
			</form>

			<div className="mt-6 text-center">
				<p className="text-gray-600">
					Already have an account?
					<button
					className="text-pink-600 font-bold hover:text-orange-600 transition-colors"
					>
					Sign in
					</button>
				</p>
			</div>
		</div>
	</div>
	);
};

  export default RegisterPage;