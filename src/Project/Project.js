import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import "./Project.css";
import ProjectFields from "./ProjectFields";
import SingleProject from "./SingleProject";
import idGenerator from '../helpers/idGenerator';
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

    showProjectFields = () => {
        this.setState({
            isAddProject: true
        })
    }

    handleAdd = (formData) => {

        if (!formData) return;
        const projects = [...this.state.projects];

        projects.push({
            id: idGenerator(),
            ...formData
        });

        this.setState({
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

    handleToggleModal = () => {
        this.setState({
            isOpenConfirm: !this.state.isOpenConfirm,
            removableProjectId: ""
        })
    }

    removeProject = () => {
        let projects = [...this.state.projects];
        const {removableProjectId} = this.state;
        projects = projects.filter((project) => project.id !== removableProjectId);
        this.setState({
            isOpenConfirm: !this.state.isOpenConfirm,
            projects
        })
    }

    render() {

        const Projects = this.state.projects.map((project) => {
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

        return (

            <div className="project">

                <Container>
                    <Row>
                        <Col md={3} className="">
                            <div className="TileStructure-children"
                                 onClick={this.showProjectFields}
                            >
                                <svg className="DashedTile--large DashedTile FlowPickerTile-dashedTile"
                                     focusable="false"
                                     viewBox="0 0 120 120">
                                    <path
                                        d="M99,119H21c-11,0-20-9-20-20V21C1,10,10,1,21,1h78c11,0,20,9,20,20v78C119,110,110,119,99,119z"
                                        className="DashedTile-outer"></path>
                                    <path
                                        d="M71,59H61V49c0-0.5-0.4-1-1-1s-1,0.4-1,1V59H49c-0.5,0-1,0.4-1,1s0.4,1,1,1H59V71c0,0.5,0.4,1,1,1s1-0.4,1-1V61H71c0.5,0,1-0.4,1-1S71.6,59,71,59z"
                                        className="DashedTile-inner"></path>
                                </svg>
                                <div>New Project</div>
                            </div>
                        </Col>
                        <Col md={5}>
                            {
                                this.state.isAddProject && <ProjectFields onSubmit={this.handleAdd}/>
                            }
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col md={12} className="">
                            <h2 className="mb-5">Projects</h2>
                            <hr/>
                        </Col>
                        {Projects}
                    </Row>
                </Container>
                {
                    this.state.isOpenConfirm && <Confirm
                        onHide={this.handleToggleModal}
                        onRemoveProject={this.removeProject}
                    />}
            </div>
        );
    }
}

export default Project;
