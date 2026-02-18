
import React, { useEffect , useState} from 'react'
import { api } from '../utils/api';
import { useSetAtom } from 'jotai';
import { userTask } from '../shared/atom';

const useFetchTask = () => {

    const setUserTask = useSetAtom(userTask);
    const [loading, setLoading] = useState(true);

     const fetchData = async () => {
        try {
            setLoading(true);
            let res = await api.get("/task");
            if(res.data.success){
                setUserTask(res.data.data);
                setLoading(false);
            }
        } catch (err) {
            console.log("Some error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);

    // very imp
    return {loading,refetch : fetchData};
}

export default useFetchTask;
