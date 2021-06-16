import './App.css';
import SideBar from "./components/SideBar/SideBar";
import { Switch, Route } from 'react-router-dom';
import Project from "./components/Project/Project";

function App(){
	return (
		<div className="App">
			<div>
				<SideBar/>
				<Switch>
					<Route path='/' exact/>
					<Route path='/reports'/>
					<Route path='/products'/>
				</Switch>
				<Project/>
			</div>
		</div>
	);
}

export default App;
