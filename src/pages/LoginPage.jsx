
import axios from 'axios';
import React, {useState} from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/api';
import {userInfo } from '../shared/atom';
import { useSetAtom } from 'jotai';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isDisable, setIsDisable] = useState(false);

    const navigate = useNavigate();
    const setUserInfo = useSetAtom(userInfo);

    const handleLogin =async ()=>{
        let data = {
            username : username.trim(),
            password : password.trim(),
        };

        if(!username.trim() || !password.trim()){
            toast.error("All Fields are required");
            return;
        }

        try {
            let res = await axios.post(`${BASE_URL}/user/login`, data, {withCredentials:true});
            if(res.data.success){
                setUserInfo(res.data.data);
                localStorage.setItem("user", JSON.stringify(res.data.data));
                toast.success(res.data.message);
                setTimeout(()=>{
                    setUsername("");
                    setPassword("");
                    setIsDisable(false);
                    navigate("/home")
                },2000)
            }            
        } catch (error) {
            setIsDisable(false);
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    return(
    <main className="min-h-screen flex items-center justify-center p-4" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
        <aside className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-float-delayed"></div>
        </aside>

        <aside className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-[1.02] transition-all duration-300">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Welcome Back
                </h1>
            <p className="text-gray-600"> <b> SprintDo </b> is waiting for you</p>
            </div>

            <form className="space-y-5" onSubmit={(e)=> e.preventDefault()}>
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase() || "")}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white outline-none transition-all duration-200"
                        placeholder="Enter your username"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white outline-none transition-all duration-200"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                onClick={handleLogin}
                    className="w-full cursor-pointer bg-linear-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    Sign In
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to={"/register"}>
                    <button
                        className="text-purple-600 font-bold hover:text-pink-600 transition-colors cursor-pointer"
                    >
                        Create one
                    </button>
                    </Link>
                </p>
            </div>
        </aside>
    </main>
    );
}

export default LoginPage;
