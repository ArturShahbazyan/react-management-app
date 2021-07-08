import { Col, FormControl, Row } from "react-bootstrap";
import search from "../../assets/images/search.svg"
import style from "./search.module.css"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [foundTasks, setFoundTasks] = useState([]);
    const tasks = useSelector(state => state.taskReducer.tasks);

    const handleSetSearchValue = (e) => {
        setSearchValue(e.target.value);
        setFoundTasks(tasks);
    };

    const filteredTasks = foundTasks.filter((taskItem) => {
        return searchValue && taskItem.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    const taskList = filteredTasks.map(task => {
        return <TaskItem task={ task } key={ task.id }/>
    });

    return (
        <div>
            <Row>
                <Col className={ `d-flex ${ style["search-row"] }` }>
                    <FormControl
                        type="search"
                        placeholder="Search..."
                        className={ style["search-field"] }
                        onChange={ handleSetSearchValue }
                    />
                    <img src={ search } alt="Search" className={ style["search-icon"] }/>
                </Col>
            </Row>
            { taskList }
        </div>
    );
};

export default Search;