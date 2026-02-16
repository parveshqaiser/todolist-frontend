
import React, { useEffect , useState} from 'react'
import { api } from '../utils/api';

const useFetchTask = () => {

    const [task, setTask] = useState();
    const [loading, setLoading] = useState(true);

     const fetchData = async () => {
        try {
            setLoading(true);
            let res = await api.get("/task");
            if(res.data.success){
                setTask(res.data.data);
                setLoading(false);            }
        } catch (err) {
            console.log("Some error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);

    return {loading,task, refetch : fetchData};
}

export default useFetchTask;
