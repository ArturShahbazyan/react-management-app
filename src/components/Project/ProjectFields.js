import React from 'react';
import { Button, Form } from "react-bootstrap";


class ProjectFields extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			id: "",
			projectName: "",
			projectSummary: "",
			date: new Date(),
			...props.editableProject
		}
	}

	handleChange = (e) => {

		const { name, value } = e.target;

		this.setState({
			...this.state,
			[ name ]: value
		})
	}

	handleSubmit = () => {

		const { onSubmit, editableProject } = this.props;
		const { projectName, projectSummary, date } = this.state;

		editableProject ? onSubmit(this.state) : onSubmit({ projectName, projectSummary, date });
	}

	componentDidUpdate(prevProps){
		if(this.props.editableProject !== prevProps.editableProject){
			if(!this.props.editableProject){
				this.setState({
					...this.state,
					id: "",
					projectName: "",
					projectSummary: "",
					date: new Date(),
				})
			} else {
				this.setState({
					...this.state,
					...this.props.editableProject
				})
			}
		}
	}

	render(){

		const { projectName, projectSummary } = this.state;
		const { editableProject } = this.props;

		return (
			<div className="projectFields">
				<Form>
					<Form.Group controlId="formBasicProjectName">
						<Form.Control type="text" placeholder="Project Name" name="projectName" value={ projectName }
						              onChange={ this.handleChange }/>
					</Form.Group>
					<Form.Group controlId="formBasicProjectSummary">
						<Form.Control type="text" placeholder="Project Summary" name="projectSummary"
						              value={ projectSummary } onChange={ this.handleChange }/>
					</Form.Group>
					<Button variant="secondary"
					        type="submit"
					        onClick={ this.handleSubmit }
					        disabled={ !(!!projectName && !!projectSummary) }
					>
						{
							editableProject ? "Edit Project" : "Create Project"
						}
					</Button>
				</Form>
			</div>
		);
	}
}

export default ProjectFields;
