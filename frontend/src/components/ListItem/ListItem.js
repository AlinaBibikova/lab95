import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Col} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

import {apiURL} from "../../constants";

const ListItem = props => {
    return (
        <Col xs="12" sm="6" md="4">
            <Card className="mb-3">
                {props.image
                    ? <RouterNavLink to={`/items/${props.id}`}>
                        <CardImg top width="100%" src={`${apiURL}/uploads/${props.image}`} alt={props.nameCocktail}/>
                    </RouterNavLink>
                    : null
                }
                <CardBody>
                    <CardTitle
                        tag={RouterNavLink}
                        to={`/items/${props.id}`}
                    >
                        {props.nameCocktail}
                    </CardTitle>
                    <CardText>{props.user}</CardText>
                    <CardText>{props.recipe}</CardText>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ListItem;