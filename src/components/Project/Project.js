import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./project.module.css";
import dashedTile from "../../assets/images/dashedTile.svg";
import idGenerator from '../../helpers/idGenerator';
import ProjectFields from "./ProjectFields";
import SingleProject from "./SingleProject";
import Confirm from "../Confirm/Confirm";


class Project extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isAddProject:false,
            removableProjectId:"",
            isOpenConfirm:false,
            editableProject:null,
            projects:[
                {
                    id:idGenerator(),
                    projectName:"Project 1",
                    projectSummary:"Business project 1",
                    date:new Date()
                },
                {
                    id:idGenerator(),
                    projectName:"Project 2",
                    projectSummary:"Business project 2",
                    date:new Date()
                },
                {
                    id:idGenerator(),
                    projectName:"Project 3",
                    projectSummary:"Business project 3",
                    date:new Date()
                }
            ]
        }
    }

    toggleProjectFields = () => {
        this.setState({
            ...this.state,
            isAddProject:true,
            editableProject:null
        })
    }

    addProject = (formData) => {

        const projects = [...this.state.projects];

        projects.push({
            id:idGenerator(),
            ...formData
        });

        this.setState({
            ...this.state,
            isAddProject:false,
            projects
        })
    }

    setRemovableProject = (id) => {

        const { isOpenConfirm } = this.state;

        this.setState({
            ...this.state,
            isOpenConfirm:!isOpenConfirm,
            removableProjectId:id
        });
    }

    toggleConfirmModal = () => {
        this.setState({
            ...this.state,
            isOpenConfirm:!this.state.isOpenConfirm,
            removableProjectId:""
        })
    }

    removeProject = () => {

        const { removableProjectId } = this.state;
        let projects = [...this.state.projects].filter((project) => project.id !== removableProjectId);

        this.setState({
            ...this.state,
            isOpenConfirm:!this.state.isOpenConfirm,
            projects
        })
    }

    projectList = () => (
        this.state.projects.map((project) => {
            return (
                <Col key={ project.id }
                     xs={ 12 }
                     md={ 6 }
                     xl={ 4 }
                     className="d-flex justify-content-center mt-4"
                >
                    <SingleProject
                        project={ project }
                        handleRemovableProject={ this.setRemovableProject }
                        handleEditableProject={ this.handleEditableProject }
                    />
                </Col>
            )
        })
    )

    handleEditableProject = (editableProject) => {
        this.setState({
            ...this.state,
            editableProject
        })
    }

    editProject = (projectData) => {

        let projects = [...this.state.projects];
        const idx = projects.findIndex((project) => project.id === projectData.id);
        projects[ idx ] = projectData;

        this.setState({
            ...this.state,
            isAddProject:false,
            editableProject:null,
            projects
        })
    }

    render(){

        const { isOpenConfirm, editableProject, isAddProject } = this.state;

        return (
            <div className={ styles.project }>
                <Container>
                    <Row>
                        <Col md={ 3 }>
                            <div className={ styles[ "tile-structure" ] }>
                                <div className={ styles[ "tile-structure-children" ] }
                                     onClick={ this.toggleProjectFields }
                                >
                                    <img src={ dashedTile } alt="Dashed Tile"/>
                                    <div className="mt-2">New Project</div>
                                </div>
                            </div>
                        </Col>
                        <Col md={ 5 }>
                            {
                                (isAddProject || editableProject) && <ProjectFields
                                    editableProject={ editableProject }
                                    onSubmit={ editableProject ? this.editProject : this.addProject }
                                />
                            }
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={ 12 }>
                            <h2 className="mb-5">Projects</h2>
                            <hr/>
                        </Col>
                        { this.projectList() }
                    </Row>
                </Container>
                {
                    isOpenConfirm && <Confirm
                        onHide={ this.toggleConfirmModal }
                        onRemoveProject={ this.removeProject }
                        show={ isOpenConfirm }
                    />
                }
            </div>
        );
    }
}

export default Project;
