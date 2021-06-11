import './App.css';
import SideBar from "./SideBar/SideBar";
import {Switch, Route} from 'react-router-dom';
import Project from "./Project/Project";

function App() {
  return (
    <div className="App">
        <>
                <SideBar />
                <Switch>
                    <Route path='/' exact />
                    <Route path='/reports'/>
                    <Route path='/products'  />
                </Switch>
               <Project/>
        </>
    </div>
  );
}

export default App;
