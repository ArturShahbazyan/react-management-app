import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import style from "./task.module.css";

const Task = () => {
    const task = useSelector(state => state.taskReducer.taskDetail);

    return (
        <Container>
            <div className={ style["task-detail"] }>
                <h3 className="mb-4">{ task.name }</h3>
                <Row>
                    <Col md={ 2 }>
                        <h5>Description</h5>
                        { <div>{ task.description }</div> }
                    </Col>
                    <Col md={ 2 }>
                        <h5>Creation Date</h5>
                        { <div>{ task.creationDate.toISOString().slice(0, 10) }</div> }
                    </Col>
                    <Col md={ 2 }>
                        <h5>Assignee</h5>
                        { <div>{ task.assignee }</div> }
                    </Col>
                    <Col md={ 2 }>
                        <h5>Estimated Time</h5>
                        { <div>{ task.estimatedTime }</div> }
                    </Col>
                    <Col md={ 2 }>
                        <h5>Worked Time</h5>
                        { <div className="mb-2">{ task.workedTime }</div> }
                    </Col>
                    <Col md={ 2 }>
                        <h5>Status</h5>
                        { <div className="mb-2">{ task.status }</div> }
                    </Col>
                </Row>
                <hr/>
                <p className="mb-0">
                    { task.name } task details
                </p>
            </div>
        </Container>
    );
};

export default Task;