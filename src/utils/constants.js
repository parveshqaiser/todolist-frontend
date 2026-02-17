

export const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Ocotber", "November", "December"];

export let initialTasks = [
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


export const getPriorityColor = (priority) => {
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

export const getStatusColor = (status) => {
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

export const initialInputValues = {
    title : "",
    description : "",
    status : "",
    priority: "",
    dueDate :"",
};

export const formatDate = (dateStr) => {
    const [year,month,day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};