import React, { useEffect, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import idGenerator from "../../helpers/idGenerator";

const ProjectFields = ({ editableProject, onSubmit }) => {
    const [fieldsState, setFieldsState] = useState({
        projectName: "",
        projectSummary: "",
        date: new Date(),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFieldsState({
            ...fieldsState,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editableProject ? onSubmit({ ...fieldsState }) : onSubmit({ id: idGenerator(), ...fieldsState });
    };

    useEffect(() => {
        if (editableProject) {
            setFieldsState({
                ...editableProject
            });
        } else {
            setFieldsState({
                projectName: "",
                projectSummary: "",
                date: new Date(),
            });
        }
    }, [editableProject]);

    const { projectName, projectSummary } = fieldsState;

    return (
        <div className="projectFields">
            <Form>
                <Form.Group controlId="formBasicProjectName">
                    <Form.Control type="text" placeholder="Project Name" name="projectName" value={ projectName }
                                  onChange={ handleChange }/>
                </Form.Group>
                <Form.Group controlId="formBasicProjectSummary">
                    <Form.Control type="text" placeholder="Project Summary" name="projectSummary"
                                  value={ projectSummary } onChange={ handleChange }/>
                </Form.Group>
                <Button variant="secondary"
                        type="submit"
                        onClick={ handleSubmit }
                        disabled={ !(projectName && projectSummary) }
                >
                    {
                        editableProject ? "Edit Project" : "Create Project"
                    }
                </Button>
            </Form>
        </div>
    );
};

export default ProjectFields;
