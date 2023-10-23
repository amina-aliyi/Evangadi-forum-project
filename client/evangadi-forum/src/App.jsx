import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/main/Home";
import SharedPage from "./components/main/SharedPage";
import NotFound from "./components/main/NotFound";
// import AllQuestions from "./components/home/AllQuestions";
import { stateValue } from "./components/main/context";
// import SingleQuestion from "./components/home/SingleQuestion";
// import AskQuestion from "./components/home/AskQuestion";
import Homes from "./components/home/Home";
import SingleQuestion from "./components/home/SingleQuestion";
import AskQuestion from "./components/home/AskQuestion";

function App() {
	let [username, setUserName] = useState("");
	const token = localStorage.getItem("token");
	console.log("this is the token", token);
	// let navigate = useNavigate();
	useEffect(() => {
		fetch("http://localhost:6001/api/users/check", {
			headers: {
				authorization: "Bearer " + token,
			},
		})
			.then((data) => data.json())
			.then((data) => {
				setUserName(data.username);
				if (
					data.msg === "token not provide" ||
					data.msg === "Authentication Invalid"
				)
					navigate("/");
			})
			.catch((error) => {
				// navigate("/");
			});
	}, []);

	return (
		<>
			<stateValue.Provider value={{ username, setUserName }}>
				<Routes>
					<Route path="/" element={<SharedPage />}>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Homes />} />
						<Route path="/question" element={<SingleQuestion />} />
						<Route path="/ask" element={<AskQuestion />} />
						<Route path="*" element={<NotFound />} />
						{/* <Route
							path="/singlequestion/:questionId"
							element={<SingleQuestion />}
						/> */}
						{/* <Route path="/askQuestion" element={<AskQuestion />} /> */}
					</Route>
				</Routes>
			</stateValue.Provider>
		</>
	);
}

export default App;
