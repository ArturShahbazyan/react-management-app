import React, { useState } from 'react';
import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faAlignLeft,
    faHome,
    faProjectDiagram,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';


const sidebarList = [
    {
        title: 'Home',
        path: '/',
        icon: <FontAwesomeIcon icon={ faHome }/>,
    },
    {
        title: 'Projects',
        path: '/reports',
        icon: <FontAwesomeIcon icon={ faProjectDiagram }/>,
    },
    {
        title: 'Support',
        path: '/support',
        icon: <FontAwesomeIcon icon={ faInfoCircle }/>
    },
];

const SideBar = () => {
    const [isSidebarOpen, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(!isSidebarOpen);
    };

    return (
        <div>
            <div className={ style.navbar } onClick={ showSidebar }>
                <Link to='#' className={ style["menu-bars"] }>
                    <FontAwesomeIcon icon={ faAlignLeft }/>
                </Link>
            </div>
            <nav className={ `${ style["nav-menu"] } ${ isSidebarOpen ? style.active : "" }` }>
                <ul className={ style["nav-menu-items"] } onClick={ showSidebar }>
                    <li className={ style["navbar-toggle"] }>
                        <Link to='#' className={ style["menu-bars"] }>
                            <FontAwesomeIcon icon={ faTimes }/>
                        </Link>
                    </li>
                    {
                        sidebarList.map((item, index) => {
                            return (
                                <li key={ index } className={ style["nav-text"] }>
                                    <Link to={ item.path }>
                                        { item.icon }
                                        <span>{ item.title }</span>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        </div>
    );
};

export default SideBar;
