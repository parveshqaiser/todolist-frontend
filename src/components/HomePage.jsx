import React, {useEffect, useState} from 'react'
import { api } from '../utils/api';
import toast from 'react-hot-toast';

let initialTasks = [
    {
        id:1,
        title : "Complete Nodejs",
        desc : "Nodejs has various modules",
        status : "Pending",
        priority : "Low",
        dueDate : "12-01-2026"
    },
     {
        id:2,
        title : "Complete React",
        desc : "React course of Akshai Saini",
        status : "In-Progress",
        priority : "High",
        dueDate : "01-03-2026"
    },
     {
        id:3,
        title : "Complete Project",
        desc : "This project is meant to enhance your frontend skills",
        status : "Pending",
        priority : "Medium",
        dueDate : "12-01-2026"
    },
    {
        id:4,
        title : "Complete SQL",
        desc : "learn from prashant",
        status : "Completed",
        priority : "Medium",
        dueDate : "12-01-2026"
    }
];

const HomePage = () => {


    const [tasks, setTasks] = useState(initialTasks);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
   

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery?.trim().toLowerCase()) ||
        task.desc.toLowerCase().includes(searchQuery?.trim().toLowerCase())
    );

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': 
                return 'bg-red-100 text-red-700 border-red-300';
            case 'Medium': 
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Low': 
                return 'bg-green-100 text-green-700 border-green-300';
            default: 
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': 
                return 'bg-green-500 text-white';
            case 'In-Progress': 
                return 'bg-yellow-500 text-white';
            case 'Pending': 
                return 'bg-gray-400 text-white';
            default: 
                return 'bg-gray-400 text-white';
        }
    };

    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
    <>
        {/* Search and Add Section */}
        <section className="md:max-w-3xl mx-auto p-2 sticky top-20 bg-linear-to-br from-slate-50 to-slate-100 z-10">
            <div className="flex flex-col min-[450px]:flex-row gap-3 items-stretch min-[450px]:items-center">

                <div className="flex-1 relative w-full">
                    <input
                        type="text"
                        placeholder="Search your tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-11 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                    />
                    <svg
                        className="w-5 h-5 absolute left-3 top-3.5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full min-[450px]:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Add Task
                </button>
            </div>
        </section>


        {/* Tasks Section */}
        <section className="max-w-7xl mx-auto px-6 pb-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                
                <div className='overflow-x-auto'>
                    <div className="hidden  sm:grid grid-cols-12  gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                        <div className="col-span-4">Task</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Priority</div>
                        <div className="col-span-2">Due Date</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    <div className="max-h-[calc(100vh-320px)] overflow-y-auto">
                        {filteredTasks.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="text-slate-500">No tasks found</p>
                            </div>
                        ) : (
                            filteredTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="grid grid-cols-12 min-w-187.5 gap-4 px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedTask(task)}
                                >
                                    <div className="col-span-4">
                                        <h3 className="font-medium text-slate-800">{task.title}</h3>
                                        {task.desc && <p className="text-sm text-slate-500 mt-1 truncate">{task.desc}</p>}
                                    </div>
                                    <div className="col-span-2 flex items-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex items-center">
                                        <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex items-center text-sm text-slate-600">
                                        <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formatDate(task.dueDate)}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-end gap-2">
                                        <button 
                                            className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Edit functionality here
                                            }}
                                        >
                                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="p-2 hover:bg-red-100 rounded-md transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Delete functionality here
                                            }}
                                        >
                                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
            {/* summary */}
            <div className="md:mt-6 mt-3 grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Total Tasks</p>
                    <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-500">{tasks.filter(t => t.status === 'In-Progress').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-gray-400">{tasks.filter(t => t.status === 'Pending').length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'Completed').length}</p>
                </div>
            </div>
        </section>

        {/* Task Detail Modal */}
        {selectedTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedTask(null)}>
                <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-slate-800">{selectedTask.title}</h2>
                        <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-slate-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-slate-600 mb-1">Description</p>
                            <p className="text-slate-700">{selectedTask.desc || 'No description provided'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Status</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                                    {selectedTask.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Priority</p>
                                <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium border ${getPriorityColor(selectedTask.priority)}`}>
                                    {selectedTask.priority}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-600 mb-1">Due Date</p>
                            <p className="text-slate-700">{formatDate(selectedTask.dueDate)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Add Task Modal Placeholder */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
                <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Task</h2>
                    <p className="text-slate-600">Form to add new task will be implemented here...</p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}
    </>
    );
};

export default HomePage;