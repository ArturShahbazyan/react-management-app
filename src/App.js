import './App.css';
import SideBar from "./components/SideBar/SideBar";
import { Switch, Route } from 'react-router-dom';
import Project from "./components/Project/Project";
import { Redirect } from "react-router";
import ProjectDetail from "./components/Project/ProjectDetail";

function App(){
    return (
        <div className="App">
            <div>
                <SideBar/>
                <Switch>
                    <Route path='/projects' exact component={Project}/>
                    <Route path='/project/:id' exact component={ProjectDetail}/>
                    <Route path='/support' exact/>
                    <Route path='*' exact component={Project}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
