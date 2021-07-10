import './App.css';
import SideBar from "./components/SideBar";
import { Switch, Route } from 'react-router-dom';
import Project from "./components/Project";
import { Redirect } from "react-router";
import ProjectDetail from "./components/Project/ProjectDetail";

function App() {
    return (
        <div className="App">
            <SideBar/>
            <div className="main">
                <Switch>
                    <Route path='/projects' exact component={ Project }/>
                    <Route path='/project/:id' exact component={ ProjectDetail }/>
                    <Route path='/support' exact/>
                    <Redirect from='*' to='/projects'/>
                </Switch>
            </div>
        </div>
    );
};

export default App;
