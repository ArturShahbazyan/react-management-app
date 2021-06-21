import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './project.module.css';
import dashedTile from '../../assets/images/dashedTile.svg';
import idGenerator from '../../helpers/idGenerator';
import ProjectFields from './ProjectFields';
import SingleProject from './SingleProject';
import Confirm from '../Confirm/Confirm';

const Project = () => {
    const [isAddProject, setAddProject] = useState(false);
    const [editableProject, setEditableProject] = useState(null);
    const [removableProjectId, setRemovableProjectId] = useState('null');
    const [isOpenConfirm, setOpenConfirm] = useState(false);
    const [projects, setProjects] = useState(
        [
            {
                id: idGenerator(),
                projectName: 'Project 1',
                projectSummary: 'Business project 1',
                date: new Date(),
            },
            {
                id: idGenerator(),
                projectName: 'Project 2',
                projectSummary: 'Business project 2',
                date: new Date(),
            },
            {
                id: idGenerator(),
                projectName: 'Project 3',
                projectSummary: 'Business project 3',
                date: new Date(),
            },
        ],
    );

    const toggleProjectFields = () => {
        setAddProject(true);
        setEditableProject(null);
    };

    const addProject = (formData) => {
        const newProjects = [...projects, { ...formData, },];

        setAddProject(false);
        setProjects(newProjects);
    };

    const setRemovableProject = (id) => {
        setOpenConfirm(!isOpenConfirm);
        setRemovableProjectId(id);
        setEditableProject(null);
        setAddProject(false);
    };

    const toggleConfirmModal = () => {
        setOpenConfirm(!isOpenConfirm);
        setRemovableProjectId('');
    };

    const removeProject = () => {
        let newProjects = [...projects].filter((project) =>
            project.id !== removableProjectId);

        setOpenConfirm(!isOpenConfirm);
        setProjects(newProjects);

    };

    const handleEditableProject = (editableProject) => {
        setEditableProject(editableProject);
    };

    const editProject = (projectData) => {
        const newProjects = projects.map((project) => {
            if (project.id !== projectData.id) return project;

            return { ...projectData };
        });

        setAddProject(false);
        setEditableProject(null);
        setProjects(newProjects);

    };

    const projectList = () => (
        projects.map((project) => {
            return (
                <Col key={ project.id }
                     xs={ 12 }
                     md={ 6 }
                     xl={ 4 }
                     className="d-flex justify-content-center mt-4"
                >
                    <SingleProject
                        project={ project }
                        handleRemovableProject={ setRemovableProject }
                        handleEditableProject={ handleEditableProject }
                    />
                </Col>
            );
        })
    );

    return (
        <div className={ styles.project }>
            <Container>
                <Row>
                    <Col md={ 3 }>
                        <div className={ styles["tile-structure"] }>
                            <div className={ styles["tile-structure-children"] }
                                 onClick={ toggleProjectFields }
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
                                onSubmit={ editableProject ? editProject : addProject }
                            />
                        }
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={ 12 }>
                        <h2 className="mb-5">Projects</h2>
                        <hr/>
                    </Col>
                    { projectList() }
                </Row>
            </Container>
            {
                isOpenConfirm && <Confirm
                    onHide={ toggleConfirmModal }
                    onRemoveProject={ removeProject }
                    show={ isOpenConfirm }
                />
            }
        </div>
    );
};

export default Project;
