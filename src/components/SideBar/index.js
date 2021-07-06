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

    return (
        <div>
            <div className={ style.navbar }>
                <Link to='#' className={ style["menu-bars"] } onClick={ toggleSidebar }>
                    <FontAwesomeIcon icon={ faAlignLeft }/>
                </Link>
            </div>
            <nav className={ `${ style["nav-menu"] } ${ isSidebarOpen ? style.active : "" }` }>
                <ul className={ style["nav-menu-items"] } onClick={ toggleSidebar }>
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