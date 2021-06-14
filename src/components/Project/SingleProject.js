import React from 'react';
import style from "./singleProject.module.css";
import {Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit, faThList} from '@fortawesome/free-solid-svg-icons';

class SingleProject extends React.Component {

    render() {

        const {project,
            handleRemovableProject,
            handleEditableProject
        } = this.props;

        return (

            <div>
                <Card className={style.projectCard}>
                    <FontAwesomeIcon icon={faThList} className={style.faThList}/>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>{project.projectName}</Card.Title>
                        <Card.Text>{project.projectSummary}</Card.Text>
                        <div>{project.date.toISOString().slice(0, 10)}</div>
                        <div className={style.faRow}>
                            <div className="mr-3">
                                <FontAwesomeIcon icon={faTrash}
                                                 className={style.faTrash}
                                                 onClick={() =>
                                                     handleRemovableProject(project.id)}
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faEdit}
                                                 className={style.faEdit}
                                                 onClick={() =>
                                                     handleEditableProject(project)}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default SingleProject;
