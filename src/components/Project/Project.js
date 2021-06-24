import { Container, Row, Col } from 'react-bootstrap';
import styles from './project.module.css';
import dashedTile from '../../assets/images/dashedTile.svg';
import ProjectFields from './ProjectFields';
import SingleProject from './SingleProject';
import Confirm from '../Confirm/Confirm';
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_PROJECT,
    CLOSE_CONFIRM_MODAL,
    EDIT_PROJECT,
    REMOVE_SINGLE_PROJECT,
    SET_ADD_PROJECT_FIELDS,
    SET_EDITABLE_PROJECT,
    SET_REMOVABLE_PROJECT_ID,
} from "../../redux/actions/types";

const Project = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectReducer.projects);
    const isAddProject = useSelector(state => state.projectReducer.isAddProject);
    const removableProjectId = useSelector(state => state.projectReducer.removableProjectId);
    const isOpenConfirm = useSelector(state => state.projectReducer.isOpenConfirm);
    const editableProject = useSelector(state => state.projectReducer.editableProject);

    const setAddProject = () => dispatch({ type: SET_ADD_PROJECT_FIELDS });

    const closeConfirmModal = () => dispatch({ type: CLOSE_CONFIRM_MODAL });

    const addProject = (formData) => {
        dispatch({ type: ADD_PROJECT, payload: { ...formData } });
    };

    const setRemovableProject = (id) => {
        dispatch({ type: SET_REMOVABLE_PROJECT_ID, id });
    };

    const removeProject = () => {
        dispatch({ type: REMOVE_SINGLE_PROJECT, removableProjectId });
    };

    const handleEditableProject = (editableProject) => {
        dispatch({ type: SET_EDITABLE_PROJECT, editableProject });
    };

    const editProject = (projectData) => {
        dispatch({ type: EDIT_PROJECT, projectData });
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
                                 onClick={ setAddProject }
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
                    onHide={ closeConfirmModal }
                    onRemoveProject={ removeProject }
                    show={ isOpenConfirm }
                />
            }
        </div>
    );
};

export default Project;
