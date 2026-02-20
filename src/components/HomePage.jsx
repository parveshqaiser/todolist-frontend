
import React, {useEffect, useState} from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { getPriorityColor, getStatusColor, initialInputValues } from '../utils/constants';
import { api } from '../utils/api';
import toast from 'react-hot-toast';
import useFetchTask from '../hooks/useFetchTask';
import { formatDate } from '../utils/constants';
import { useAtom } from 'jotai';
import { userTask } from '../shared/atom';

const HomePage = () => {


    let {loading: loadingTask , refetch} = useFetchTask();
    let [task] = useAtom(userTask);

    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [inputValues, setInputValues] = useState({
        title : "",
        description : "",
        status : "",
        priority: "",
        dueDate :"",
    });


    const filteredTasks = tasks && tasks?.filter(item =>
        item.title?.toLowerCase().includes(searchQuery?.trim().toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery?.trim().toLowerCase())
    );

    const handleChange =(e)=>{
        let {name,value} = e.target;

        if(name=="title" || name =="description"){
            let val = value && value.charAt(0).toUpperCase() + value.slice(1);
           setInputValues({...inputValues,[name]: val});
        }
        else if(name =="status" || name =="priority"){
            setInputValues({...inputValues,[name] : value})
        }       
    }

    useEffect(() => {
        if (task) {
            setTasks(task);
        }
    }, [task]);

    const handleSubmit= async()=>{

        let createTask = {
            ...inputValues,
            status : inputValues.status || "Pending",
            priority : inputValues.priority || "Low"
        };

        let updateTask = {
            title : inputValues.title,
            description : inputValues.description,
            status : inputValues.status,
            priority : inputValues.priority, 
            dueDate : inputValues.dueDate,
        };

        if(isEdit)
        {
            try {
                let res = await api.put(`/task/${inputValues._id}`,updateTask);
                if(res.data.success){
                    toast.success(res.data.message);
                    setIsOpen(false);
                    setIsEdit(false)
                    refetch();
                    setInputValues(initialInputValues);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || error?.message, {duration:2000})
            }
        }else {
            try {
            let res = await api.post("/task",createTask);
            if(res.data.success){
                toast.success(res.data.message);
                setIsOpen(false);
                refetch();
                setInputValues(initialInputValues);
            }
            } catch (error) {
                toast.error(error?.response?.data?.message || error?.message, {duration:2000})
            }
        }       
    }   

    const handleDeleteTask = async(id)=>{

        try {
            let res = await api.delete(`/task/${id}`);
            if(res.data.success){
                toast.success(res.data.message);
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message, {duration:2000})
        }
    }

    if(loadingTask){
        return <div className='text-center text-red-600 text-4xl'>Loading...</div>
    }

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
                    onClick={() => setIsOpen(true)}
                    className="w-full cursor-pointer min-[450px]:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center gap-2"
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

                    <div className="max-h-[calc(100vh-250px)] overflow-y-auto" >
                        {Array.isArray(filteredTasks) && filteredTasks?.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="text-slate-500">No tasks found</p>
                            </div>
                        ) : (
                            filteredTasks?.map((task) => (
                                <div
                                    key={task.id}
                                    className="grid grid-cols-12 min-w-187.5 gap-4 px-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                                    onClick={(e) =>{setSelectedTask(task)}}
                                >
                                    <div className="col-span-4"  title='Click to View More'>
                                        <h3 className="font-medium text-slate-800">{task.title}</h3>
                                        {task.description && <p className="text-sm text-slate-500 mt-1 truncate">{task.description.slice(0,20)}...</p>}
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
                                            onClick={(e)=>{e.stopPropagation(), setInputValues(task),setIsEdit(true), setIsOpen(true)}} 
                                            className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button 
                                            className="p-2 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                                            onClick={(e)=> {e.stopPropagation(), handleDeleteTask(task._id)}}
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
        </section>

        {/* Task Detail Modal */}
        {selectedTask && (
            <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedTask(null)}>
                <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold text-slate-800">{selectedTask.title}</h2>
                        <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <section className="space-y-3">
                        <div>
                            <p className="text-sm font-medium text-slate-600 mb-1">Description</p>
                            <p className="text-slate-700 text-right">{selectedTask.description || 'No description provided'}</p>
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Created On</p>
                                <p className={`text-slate-700`}>
                                    {formatDate(selectedTask.createdAt.split("T")[0])}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-1">Due Date</p>
                                <p className="text-slate-700">{formatDate(selectedTask.dueDate)}</p>
                            </div>
                        </div>

                    </section>
                </div>
            </main>
        )}

        {/* add edit modal */}
        <Dialog open={isOpen} as="div" className="relative z-50" onClose={()=> {setIsOpen(false),setInputValues(initialInputValues)}}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-lg rounded-2xl bg-zinc-900 p-8 shadow-2xl border border-white/10">
                    <DialogTitle className="text-xl font-semibold text-white mb-4">
                        {isEdit ? "Update Task" : "Create Task"}
                    </DialogTitle>

                    <form className="space-y-2" onSubmit={(e)=>e.preventDefault()}>
                        <div>
                            <label className="block text-sm text-white/70 mb-2">Title</label>
                            <input
                                type="text"
                                name='title'
                                value={inputValues.title}
                                onChange={handleChange}
                                placeholder="Task title..."
                                className="w-full rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/70 mb-2">Description</label>
                            <textarea
                                rows="2"
                                value={inputValues.description}
                                name='description'
                                onChange={handleChange}
                                placeholder="Task description..."
                                className="w-full rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-white/70 mb-2">Status</label>
                                <select 
                                    value={inputValues.status}
                                    name='status' 
                                    onChange={handleChange} 
                                    className="w-full rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In-Progress">In Progress</option>
                                    {isEdit && <option value="Completed">Completed</option>}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-white/70 mb-2">Priority</label>
                                <select 
                                    value={inputValues.priority}
                                    name='priority' 
                                    onChange={handleChange} 
                                    className="w-full rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option >Low</option>
                                    <option >Medium</option>
                                    <option >High</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-white/70 mb-2">Due Date</label>
                            <div className="bg-zinc-300 p-3 rounded-sm border border-white/10">
                                <input type="date" value={inputValues.dueDate} onChange={(e)=> setInputValues({...inputValues, dueDate:e.target.value})} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={()=> {setIsOpen(false), setIsEdit(false),setInputValues(initialInputValues)}}
                                className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 transition cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="cursor-pointer px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20"
                            >
                                {isEdit ? "Update Task" : "Create Task"}
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    </>
    );
};

export default HomePage;