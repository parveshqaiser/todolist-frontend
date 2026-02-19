

import Navbar from './Navbar'
import { Outlet} from 'react-router-dom'
import useFetchUserData from '../hooks/useFetchUserData';

// export let UserContext = createContext();

const Body = () => {

    let {loading} = useFetchUserData();
   
    if(loading){
        return <div className='text-center'>Loading...</div>
    }

    return (
        <>
            <div className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default Body;
