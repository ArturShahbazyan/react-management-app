import React from 'react';
import style from "./singleProject.module.css";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faThList } from '@fortawesome/free-solid-svg-icons';

class SingleProject extends React.Component {

    handleRemove = () => {

        const { project, handleRemovableProject } = this.props;

        handleRemovableProject(project.id);
    }

    handleEdit = () => {

        const { project, handleEditableProject } = this.props;

		handleEditableProject(project.id);
    }

    render(){

        const { project } = this.props;

        return (

            <div>
                <Card className={ style[ "project-card" ] }>
                    <FontAwesomeIcon icon={ faThList } className={ style[ "fa-thList" ] }/>
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>{ project.projectName }</Card.Title>
                        <Card.Text>{ project.projectSummary }</Card.Text>
                        <div>{ project.date.toISOString().slice(0, 10) }</div>
                        <div className={ style[ "fa-row" ] }>
                            <div className="mr-3">
                                <FontAwesomeIcon icon={ faTrash }
                                                 className={ style[ "fa-trash" ] }
                                                 onClick={ this.handleRemove }
                                />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faEdit }
                                                 className={ style[ "fa-edit" ] }
                                                 onClick={ this.handleEdit }
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
