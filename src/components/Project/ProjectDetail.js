import { useSelector } from "react-redux";
import style from "./projectDetail.module.css"
import { Col, Container, Row } from "react-bootstrap";
import Search from "../Search/Search";

const ProjectDetail = () => {
    const projectDetail = useSelector(state => state.projectReducer.projectDetail);

    return (
        <div className={ style["project-detail"] }>
            <Container fluid>
                <h2>{ projectDetail && projectDetail.projectName }</h2>
                <p>{ projectDetail && projectDetail.projectSummary }</p>
                <Row className="mt-5">
                    <Col md={ 3 } className={ style["tasks-col"] }>
                    </Col>
                    <Col md={ 6 } className={ `${ style["tasks-details"] } ${ style["tasks-col"] }` }>
                    </Col>
                    <Col md={ 3 } className={ `${ style["tasks-col"] }` }>
                        <Search/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default ProjectDetail;