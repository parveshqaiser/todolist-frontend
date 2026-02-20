

import { useAtom } from 'jotai';
import { useNavigate , Navigate} from 'react-router-dom';
import { userInfo } from '../shared/atom';

const ProtectedRoute = ({children}) => {

    // const [user] = useAtom(userInfo);
    let authUser = JSON.parse(localStorage.getItem("user"));

    if(!authUser)
    {
        return <Navigate to="/" replace />;
    }

    return children;

}

export default ProtectedRoute;
