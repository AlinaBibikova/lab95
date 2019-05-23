import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Col} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

import {apiURL} from "../../constants";

const ListCocktail = props => {
    return (
        <Col xs="12" sm="6" md="4">
            <Card className="mb-3">
                {props.image
                    ? <RouterNavLink to={`/cocktails/${props.id}`}>
                        <CardImg top width="100%" src={`${apiURL}/uploads/${props.image}`} alt={props.name}/>
                    </RouterNavLink>
                    : null
                }
                <CardBody>
                    <CardTitle
                        tag={RouterNavLink}
                        to={`/cocktails/${props.id}`}
                    >
                        {props.name}
                    </CardTitle>
                    <CardText>{props.user}</CardText>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ListCocktail;