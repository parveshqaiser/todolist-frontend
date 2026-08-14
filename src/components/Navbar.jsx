
import { Link, useLocation} from "react-router-dom";
import { useAtom} from "jotai";
import { userInfo, userTask } from "../shared/atom";
import { displayDate } from "../utils/constants";
import { logout } from "../utils/logout";
import { useResetAtom } from "jotai/utils";

const Navbar = () => {

    let [userData] = useAtom(userInfo);
    const resetUserInfo = useResetAtom(userInfo);
    const resetUserTask = useResetAtom(userTask);

    const loc = useLocation();

    let isHome = loc.pathname === "/home";

    function handleLogout(){
        resetUserInfo();
        resetUserTask();
        setTimeout(()=>{
            logout();
        },1500);
    }

    return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/20 backdrop-blur-xl shadow-sm">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">

            {/* desk */}
            <section className="hidden md:flex items-center justify-between">

                {/* Brand + Welcome */}
                <div className="flex items-center gap-4">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
                                Sprint<span className="text-blue-600">Do</span>
                            </h1>
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                                Stay productive
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-10 w-px bg-slate-200 mx-2" />

                    {/* Welcome */}
                    <div>
                        <p className="text-xs text-slate-400 font-medium">
                            Welcome back
                        </p>

                        <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-700">
                                {userData?.fullName || "User"}
                            </p>

                            {isHome ? (
                                <Link
                                    to="/home/profile"
                                    title="Profile"
                                    className="group p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                >
                                    <svg
                                        className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </Link>
                            ) : (
                                <Link
                                    to="/home"
                                    title="Home"
                                    className="group p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                >
                                    <svg
                                        className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 9.75L12 3l9 6.75M4.5 10.5V20a1 1 0 001 1H9v-6h6v6h3.5a1 1 0 001-1v-9.5"
                                        />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">

                    {/* Date & Weather */}
                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100">

                        {/* Weather icon */}
                        <div className="w-9 h-9 rounded-lg bg-linear-to-b -to-br from-sky-100 to-blue-100 flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-sky-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 15a4 4 0 004 4h9a5 5 0 10-4.9-6H11a4 4 0 00-8 2z"
                                />
                            </svg>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-700">
                                {displayDate()}
                            </p>
                            <p className="text-xs text-slate-400">
                                Partly cloudy · 22°C
                            </p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        title="Logout"
                        className="group w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 transition-all duration-200 cursor-pointer"
                    >
                        <svg
                            className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </div>
            </section>

            {/* M */}
            <article className="md:hidden">

                <div className="flex items-center justify-between gap-3">

                    {/* Brand + User */}
                    <div className="flex items-center gap-2.5 min-w-0">

                        <div className="w-9 h-9 shrink-0 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-base font-extrabold tracking-tight text-slate-800">
                                Sprint<span className="text-blue-600">Do</span>
                            </h1>

                            <div className="flex items-center gap-1 min-w-0">
                                <p className="text-[11px] text-slate-400 truncate">
                                    Hi,{" "}
                                    <span className="font-semibold text-slate-600">
                                        {userData?.fullName || "User"}
                                    </span>
                                </p>

                                {isHome ? (
                                    <Link
                                        to="/home/profile"
                                        className="shrink-0 p-1 rounded-md hover:bg-blue-50 transition-colors"
                                        title="Profile"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5 text-slate-500 hover:text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link
                                        to="/home"
                                        className="shrink-0 p-1 rounded-md hover:bg-blue-50 transition-colors"
                                        title="Home"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5 text-slate-500 hover:text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 9.75L12 3l9 6.75M4.5 10.5V20a1 1 0 001 1H9v-6h6v6h3.5a1 1 0 001-1v-9.5"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile right */}
                    <div className="flex items-center gap-2 shrink-0">

                        {/* Date */}
                        <div className="hidden xs:block text-right">
                            <p className="text-[11px] font-semibold text-slate-600">
                                {displayDate()}
                            </p>
                            <div className="flex items-center justify-end gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                <p className="text-[10px] text-slate-400">
                                    22°C
                                </p>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 transition-all duration-200 cursor-pointer"
                        >
                            <svg
                                className="w-4 h-4 text-slate-500 hover:text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
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


 