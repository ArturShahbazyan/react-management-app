import { Col, FormControl, Row } from "react-bootstrap";
import search from "../../assets/images/search.svg"
import style from "./search.module.css"
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import update from 'immutability-helper';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [foundTasks, setFoundTasks] = useState([]);
    const tasks = useSelector(state => state.taskReducer.tasks);

    const moveFoundTask = useCallback((dragIndex, hoverIndex) => {
        const dragFoundTask = foundTasks[dragIndex];
        setFoundTasks(update(foundTasks, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragFoundTask],
            ],
        }));
    }, [foundTasks]);

    const handleSetSearchValue = (e) => {
        setSearchValue(e.target.value);
        setFoundTasks(tasks);
    };

    const filteredTasks = foundTasks.filter((taskItem) => {
        return searchValue && taskItem.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    const taskList = filteredTasks.map((task, index) => {
        return <TaskItem
            task={ task }
            key={ task.id }
            id={task.id}
            index={index}
            moveFoundTask={moveFoundTask}
        />
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