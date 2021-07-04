import { Col, FormControl, Row } from "react-bootstrap";
import search from "../../assets/images/search.svg"
import style from "./search.module.css"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const task = useSelector(state => state.taskReducer.task);

    const filteredTasks = task.filter(task => {
        if(searchValue) {
            return task.name.toLowerCase().includes(searchValue.toLowerCase());
        }
        return null;
    });

   const tasksList = filteredTasks.map(task=> {
        return <TaskItem name={task.name} key={task.id}/>
    });

    const handleSetSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

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
            { tasksList }
        </div>
    );
};

export default Search;