import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faAlignLeft,
    faProjectDiagram,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { TOGGLE_SIDEBAR } from "../../redux/actions/types";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const sidebarList = [
    {
        title: 'Projects',
        path: '/projects',
        icon: <FontAwesomeIcon icon={ faProjectDiagram }/>,
    },
    {
        title: 'Support',
        path: '/support',
        icon: <FontAwesomeIcon icon={ faInfoCircle }/>
    },
];

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {

    const [isMinimize, setMinimize] = useState(false);

    useEffect(() => {
        const handleMinimize = () => {
            if (document.documentElement.scrollTop > 20) setMinimize(true);
            if (document.documentElement.scrollTop < 2) setMinimize(false);
        };

        window.addEventListener("scroll", handleMinimize);
        return () => window.removeEventListener("scroll", handleMinimize);
    }, []);

    return (
        <div>
            <div className={ `${ style.navbar } ${ isMinimize ? style["navbar-minimize"] : "" } ` }>
                <Link
                    to='#'
                    className={ `${ style["menu-bars"] } ${ isMinimize ? style["menu-bars-minimize"] : "" }` }
                    onClick={ toggleSidebar }
                >
                    <FontAwesomeIcon icon={ faAlignLeft }/>
                </Link>
            </div>
            <nav className={ `${ style["nav-menu"] } ${ isSidebarOpen ? style.active : "" }` }>
                <ul className={ style["nav-menu-items"] } onClick={ toggleSidebar }>
                    <li className={ style["navbar-toggle"] }>
                        <Link to='#'
                              className={ `${ style["menu-bars"] }` }>
                            <FontAwesomeIcon icon={ faTimes }/>
                        </Link>
                    </li>
                    {
                        sidebarList.map((item, index) => {
                            return (
                                <li key={ index } className={ style["nav-text"] }>
                                    <Link to={ item.path }>
                                        { item.icon }
                                        <span className="ml-3">{ item.title }</span>
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

const mapStateToProps = (state) => {
    return {
        isSidebarOpen: state.sidebarReducer.isSidebarOpen,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSidebar: () => dispatch({ type: TOGGLE_SIDEBAR })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);