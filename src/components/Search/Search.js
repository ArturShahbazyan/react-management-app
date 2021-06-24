import { Button, Col, FormControl, Row } from "react-bootstrap";
import search from "../../assets/images/search.svg"
import style from "./search.module.css"
import React from "react";

const Search = () => {

    return (
        <Row>
            <Col className={ `d-flex ${ style["search-row"] }` }>
                <FormControl type="text" placeholder="Search..." className={ style["search-field"] }/>
                <img src={ search } alt="Search" className={ style["search-icon"] }/>
            </Col>
        </Row>
    )
};

export default Search;