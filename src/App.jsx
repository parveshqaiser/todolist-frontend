
import Body from "./components/Body";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = ()=>{
	
	return(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginPage />}/>
			<Route path="/register" element={<RegisterPage/>}/>
			<Route path="/home" element={<Body/>}>
				<Route index element={<HomePage />} />
				<Route path="profile" element={<ProfilePage />} />
			</Route>
		</Routes>
	</BrowserRouter>
	)
}

export default App;