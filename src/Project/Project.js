import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import "./Project.css";
import dashedTile from "../assets/images/dashedTile.svg";
import idGenerator from '../helpers/idGenerator';
import ProjectFields from "./ProjectFields";
import SingleProject from "./SingleProject";
import Confirm from "../Confirm/Confirm";


class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddProject: false,
            removableProjectId: "",
            isOpenConfirm: false,
            projects: [
                {
                    id: idGenerator(),
                    projectName: "My Project",
                    projectSummary: "Business project",
                    date: new Date()
                },
                {
                    id: idGenerator(),
                    projectName: "My Project",
                    projectSummary: "Business project",
                    date: new Date()
                },
                {
                    id: idGenerator(),
                    projectName: "My Project",
                    projectSummary: "Business project",
                    date: new Date()
                }
            ]
        }
    }

    toggleProjectFields = () => {
        this.setState({
            ...this.state,
            isAddProject: true
        })
    }

    addProject = (formData) => {

        const projects = [...this.state.projects];

        projects.push({
            id: idGenerator(),
            ...formData
        });

        this.setState({
            ...this.state,
            projects,
            isAddProject: false
        })
    }


    setRemovableProject = (id) => {

        const {isOpenConfirm} = this.state;

        this.setState({
            isOpenConfirm: !isOpenConfirm,
            removableProjectId: id
        });
    }

    toggleConfirmModal = () => {
        this.setState({
            ...this.state,
            isOpenConfirm: !this.state.isOpenConfirm,
            removableProjectId: ""
        })
    }

    removeProject = () => {
        let projects = [...this.state.projects];
        const {removableProjectId} = this.state;
        projects = projects.filter((project) => project.id !== removableProjectId);
        this.setState({
            ...this.state,
            isOpenConfirm: !this.state.isOpenConfirm,
            projects
        })
    }

    projectList = () => (
        this.state.projects.map((project) => {
            return (
                <Col key={project.id}
                     xs={12}
                     md={6}
                     xl={4}
                     className="d-flex justify-content-center mt-4"
                >
                    <SingleProject
                        project={project}
                        handleRemovableProject={this.setRemovableProject}
                    />
                </Col>
            )
        })
    )

    render() {

        const { isOpenConfirm } = this.state;

        return (

            <div className="project">
                <Container>
                    <Row>
                        <Col md={3} className="">
                            <div className="TileStructure">
                                <div className="TileStructure-children"
                                     onClick={this.toggleProjectFields}
                                >
                                    <img src={dashedTile} alt="Dashed Tile"/>
                                    <div className="mt-2">New Project</div>
                                </div>
                            </div>
                        </Col>
                        <Col md={5}>
                            {
                                this.state.isAddProject && <ProjectFields
                                    onSubmit={this.addProject}
                                />
                            }
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md={12}>
                            <h2 className="mb-5">Projects</h2>
                            <hr/>
                        </Col>
                        {this.projectList()}
                    </Row>
                </Container>
                {
                    isOpenConfirm && <Confirm
                         onHide={this.toggleConfirmModal}
                        onRemoveProject={this.removeProject}
                        show={isOpenConfirm}
                    />
                }
            </div>
        );
    }
}

export default Project;
