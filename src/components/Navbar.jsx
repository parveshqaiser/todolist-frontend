
import { Link, useLocation} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/authContext";
import { UserContext } from "./Body";
import { months, weeks } from "../utils/constants";
import { useAtom } from "jotai";
import { userInfo } from "../shared/atom";
import { displayDate } from "../utils/constants";

const Navbar = () => {

    // let {logout} = useContext(AuthContext);

    let [userData] = useAtom(userInfo);

    const loc = useLocation();

    return (
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                {/* for larger devices */}
                <section className="hidden md:flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm ">Welcome back, {userData && <span className="text-yellow-500">{userData?.fullName}</span>} </p>
                            {loc.pathname !="/home/profile" && <Link to={"/home/profile"} className="hover:bg-blue-300 p-1 rounded transition-colors">
                                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>}
                            
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-sm font-medium text-slate-700">{displayDate()}</p>
                            <p className="text-xs text-slate-500">Partly Cloudy · 22°C</p>
                        </div>
                        <button  className="hover:bg-red-50 p-2 rounded-lg transition-colors group cursor-pointer">
                            <svg className="w-5 h-5 text-slate-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* for smaller devices */}
                <article className="md:hidden">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg sm:text-xl font-bold text-slate-800">My Tasks</h1>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <p className="text-xs sm:text-sm text-slate-500 truncate">Welcome, {userData && <span className="text-yellow-500">{userData?.fullName}</span>} </p>
                                <button className="hover:bg-slate-100 p-1 rounded transition-colors shrink-0">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 ml-2">
                            <div className="text-right">
                                <p className="text-xs sm:text-sm font-medium text-slate-700">{displayDate()}</p>
                                <p className="text-[10px] sm:text-xs text-slate-500">22°C</p>
                            </div>
                            <button className="hover:bg-red-50 p-1.5 sm:p-2 rounded-lg transition-colors group shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
            </main>
        </header>
    );
};

export default Navbar;