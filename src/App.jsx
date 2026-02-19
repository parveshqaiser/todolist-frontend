
import { Toaster } from "react-hot-toast";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Body from "./components/Body";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = ()=>{
	
	return(
	<>
	<Toaster position="top-center" reverseOrder={false}></Toaster>
		<BrowserRouter>	
			{/* <AuthProvider> */}
				<Routes>
					<Route index path="/" element={<LoginPage />}/>
					<Route path="/register" element={<RegisterPage/>}/>
					<Route path="/home" element={<ProtectedRoute><Body/></ProtectedRoute> }>
						<Route index element={<HomePage />} />
						<Route path="profile" element={<ProfilePage />} />
					</Route>
				</Routes>
			{/* </AuthProvider> */}
		</BrowserRouter>
	</>
	)
}

export default App;