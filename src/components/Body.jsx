

import Navbar from './Navbar'
import { Outlet} from 'react-router-dom'
import useFetchUserData from '../hooks/useFetchUserData';
import Spinner from './Spinner';

const Body = () => {

    let {loading} = useFetchUserData();
   
    // if(loading){
    //     return <div className='text-center text-red-600 text-xl'>Loading... Please Wait</div>
    // }

    if(loading){
        return <Spinner />
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
