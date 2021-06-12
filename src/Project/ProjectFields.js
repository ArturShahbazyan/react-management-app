import React from 'react';
import {Button, Form} from "react-bootstrap";


class ProjectFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddProject: false,
            projectName: "",
            projectSummary: "",
            date:new Date()
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = () => {

        const {onSubmit} = this.props;

        const {projectName,projectSummary, date} = this.state;
        const formData = {projectName,projectSummary, date};

        onSubmit(formData);

       this.setState({
           projectName:'',
           projectSummary:''
       })
    }

    render(){

        const {projectName,projectSummary} = this.state;

        return (
            <div className="projectFields">
                <div>
                    <Form.Group controlId="formBasicProjectName">
                        <Form.Control type="text" placeholder="Project Name" name="projectName" value={projectName} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicProjectSummary">
                        <Form.Control type="text" placeholder="Project Summary" name="projectSummary" value={projectSummary} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="secondary"
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={!(!!projectName && !!projectSummary)}
                    >
                        Create Project
                    </Button>
                </div>
            </div>
        );
    }
}

export default ProjectFields;
