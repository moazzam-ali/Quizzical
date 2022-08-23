import React from "react";
import "./App.css";
import StartUp from "./components/startup/startup.component";
import {Routes, Route} from "react-router-dom"
import Quiz from "./components/quiz/quiz.component";

function App() {
	console.log("App rendered!!!")
	return <div className="App">
		<Routes>
			<Route path="/" element={<StartUp/>} />
			<Route path="/quiz" element={<Quiz/>} />
		</Routes>
	</div>
}

export default App;
