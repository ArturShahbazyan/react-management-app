import React from 'react';
import {Link} from "react-router-dom";
import style from "./sidebar.module.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes,
       faAlignLeft,
       faHome,
       faProjectDiagram,
       faInfoCircle
       } from '@fortawesome/free-solid-svg-icons';


const sidebarList = [
    {
        title: 'Home',
        path: '/',
        icon:  <FontAwesomeIcon icon={faHome}/>,
    },
    {
        title: 'Projects',
        path: '/reports',
        icon:  <FontAwesomeIcon icon={faProjectDiagram}/>,
    },
    {
        title: 'Support',
        path: '/support',
        icon:  <FontAwesomeIcon icon={faInfoCircle}/>
    }
];


class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebar:false
        }
    }

    showSidebar = () => {
          this.setState({
            sidebar: !this.state.sidebar
        })
    }

    render(){

        const {sidebar} = this.state;

        return (
            <div>
                <div className={style.navbar} onClick={this.showSidebar}>
                    <Link to='#' className={style.menu_bars}>
                        <FontAwesomeIcon icon={faAlignLeft}/>
                    </Link>
                </div>
                <nav className={`${style.nav_menu} ${sidebar ? style.active : ""}`}>
                <ul className={style.nav_menu_items} onClick={this.showSidebar}>
                        <li className={style.navbar_toggle}>
                            <Link to='#' className={style.menu_bars}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Link>
                        </li>
                        {sidebarList.map((item, index) => {
                            return (
                                <li key={index} className={style.nav_text}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        );
    }

}

export default SideBar;
