import React from 'react';
import style from "./singleProject.module.css";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faThList } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PROJECT_DETAIL } from "../../redux/actions/types";

const SingleProject = ({
                           project,
                           handleRemovableProject,
                           handleEditableProject,
                       }) => {
    const dispatch = useDispatch();
    const setProjectDetail = () => dispatch({
        type: SET_PROJECT_DETAIL, payload: { ...project }
    });

    const handleRemove = () => {
        handleRemovableProject(project.id);
    };

    const handleEdit = () => {
        handleEditableProject(project);
    };

    return (
        <div>
            <Card className={ style["project-card"] }>
                <FontAwesomeIcon icon={ faThList } className={ style["fa-th-list"] }/>
                <Card.Body className="d-flex flex-column">
                    <Link className={ style["project-name"] } onClick={ setProjectDetail }
                          to={ `/project/${ project.id }` }>
                        <Card.Title className="font-weight-bold">{ project.name }</Card.Title>
                    </Link>
                    <Card.Text>{ project.summary }</Card.Text>
                    <div>{ project.date.toISOString().slice(0, 10) }</div>
                    <div className={ style["fa-row"] }>
                        <div className="mr-3">
                            <FontAwesomeIcon
                                icon={ faTrash }
                                className={ style["fa-trash"] }
                                onClick={ handleRemove }
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={ faEdit }
                                className={ style["fa-edit"] }
                                onClick={ handleEdit }
                            />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SingleProject;
