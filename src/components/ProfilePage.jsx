
import React, {useEffect, useState } from 'react';
import { api } from '../utils/api';

const ProfilePage = () => {

    const [fullName, setFullName] = useState('Virat Kohli');
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(fullName);

	useEffect(()=>{
		console.log("use effect")
	},[])

    const handleUpdate = () => {
        setFullName(tempName);
        setIsEditing(false);
    };

    const stats = {
        totalTasks: 47,
        completedOnTime: 35,
        inProgress: 8,
        failed: 4,
        completionRate: 50,
        currentStreak: 12,
        longestStreak: 28
    };

    const achievements = [
        { icon: '🏆', title: 'Early Bird', desc: 'Completed 10 tasks before 9 AM' },
        { icon: '🔥', title: 'Hot Streak', desc: '7 days in a row' },
        { icon: '⚡', title: 'Speed Demon', desc: 'Finished 5 tasks in one day' },
        { icon: '🎯', title: 'Perfectionist', desc: '95% on-time completion' }
    ];

    return (
	<main className="min-h-screen px-4 sm:px-6 py-8 max-w-7xl mx-auto">
		
		<header className="mb-8">
			<h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">Profile</h1>
			<p className="text-slate-500">Manage your account and view your progress</p>
		</header>

		<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			
			<aside className="lg:col-span-1 space-y-6">
				{/* Profile Card */}
				<div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
					<div className="flex flex-col items-center text-center">
						<div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
							<svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<h2 className="text-2xl font-bold mb-1">{fullName}</h2>
						<p className="text-blue-100 text-sm mb-4">@viratkohli</p>
						<div className="flex gap-4 text-center">
							<div>
								<p className="text-2xl font-bold">{stats.currentStreak}</p>
								<p className="text-xs text-blue-100">Day Streak</p>
							</div>
							<div className="w-px bg-blue-400"></div>
							<div>
								<p className="text-2xl font-bold">{stats.completionRate}%</p>
								<p className="text-xs text-blue-100">On-Time Rate</p>
							</div>
						</div>
					</div>
				</div>

				{/* Edit Profile */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
					<h3 className="text-lg font-semibold text-slate-800 mb-4">Edit Profile</h3>
					
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-slate-600 mb-2">Username</label>
							<input
								type="text"
								value="viratkohli"
								readOnly
								className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"
							/>
							<p className="text-xs text-slate-400 mt-1">Username cannot be changed</p>
						</div>

						<div>
							<label className="block text-sm font-medium text-slate-600 mb-2">Full Name</label>
							{isEditing ? (
								<input
									type="text"
									value={tempName}
									onChange={(e) => setTempName(e.target.value)}
									className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
									autoFocus
								/>
							) : (
								<input
									type="text"
									value={fullName}
									readOnly
									className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:border-slate-300"
									onClick={() => {
										setIsEditing(true);
										setTempName(fullName);
									}}
								/>
							)}
						</div>

						{isEditing && (
							<div className="flex gap-2">
								<button
									onClick={handleUpdate}
									className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
								>
									Save Changes
								</button>
								<button
									onClick={() => setIsEditing(false)}
									className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
								>
									Cancel
								</button>
							</div>
						)}
					</div>
				</div>
			</aside>

			<aside className="lg:col-span-2 space-y-6">
				{/* Task Statistics */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-slate-800">Task Statistics</h3>
						<span className="text-xs text-slate-500">All time</span>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
						<div className="text-center p-4 bg-slate-50 rounded-xl">
							<p className="text-3xl font-bold text-slate-800 mb-1">{stats.totalTasks}</p>
							<p className="text-sm text-slate-500">Total Tasks</p>
						</div>
						<div className="text-center p-4 bg-green-50 rounded-xl">
							<p className="text-3xl font-bold text-green-600 mb-1">{stats.completedOnTime}</p>
							<p className="text-sm text-green-700">Completed</p>
						</div>
						<div className="text-center p-4 bg-blue-50 rounded-xl">
							<p className="text-3xl font-bold text-blue-600 mb-1">{stats.inProgress}</p>
							<p className="text-sm text-blue-700">In Progress</p>
						</div>
						<div className="text-center p-4 bg-red-50 rounded-xl">
							<p className="text-3xl font-bold text-red-600 mb-1">{stats.failed}</p>
							<p className="text-sm text-red-700">Missed</p>
						</div>
					</div>

					{/* Progress Bar */}
					<div>
						<div className="flex justify-between text-sm mb-2">
							<span className="text-slate-600">On-Time Completion Rate</span>
							<span className="font-semibold text-slate-800">{stats.completionRate}%</span>
						</div>
						<div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
							<div 
								className="h-full bg-linear-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
								style={{ width: `${stats.completionRate}%` }}
							></div>
						</div>
					</div>
				</div>

				{/* Achievements */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
					<h3 className="text-lg font-semibold text-slate-800 mb-4">Achievements</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{achievements.map((achievement, index) => (
							<div 
								key={index}
								className="flex items-start gap-3 p-4 bg-linear-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow"
							>
								<div className="text-3xl">{achievement.icon}</div>
								<div>
									<h4 className="font-semibold text-slate-800 mb-1">{achievement.title}</h4>
									<p className="text-sm text-slate-500">{achievement.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Activity Summary */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
					<h3 className="text-lg font-semibold text-slate-800 mb-4">Activity Summary</h3>
					<div className="space-y-3">
						<div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
									<svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</div>
								<div>
									<p className="font-medium text-slate-800">Current Streak</p>
									<p className="text-sm text-slate-500">{stats.currentStreak} days</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-sm text-slate-500">Best: {stats.longestStreak} days</p>
							</div>
						</div>

						<div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
									<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div>
									<p className="font-medium text-slate-800">Average Completion Time</p>
									<p className="text-sm text-slate-500">2.3 days per task</p>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
									<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div>
									<p className="font-medium text-slate-800">Most Productive Day</p>
									<p className="text-sm text-slate-500">Monday (14 tasks)</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</section>
	</main>
    );
};

export default ProfilePage;