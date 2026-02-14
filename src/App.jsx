
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = ()=>{

	// let appRoutes = createBrowserRouter[
	// 	{
	// 		path : "/",
	// 		index : true,
	// 		element : <LoginPage />
	// 	},
	// 	{
	// 		path : "/registration",
	// 		element : <RegistrationPage />
	// 	}
	// ]
	
	return(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginPage />}/>
			<Route path="/register" element={<RegisterPage/>}/>
		</Routes>
	</BrowserRouter>
	)
}

export default App;