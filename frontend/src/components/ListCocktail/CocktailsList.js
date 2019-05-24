import React from 'react';
import {Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

import {apiURL} from "../../constants";

const CocktailsList = props => {
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
                </CardBody>
                {props.user && props.user.role === 'admin'
                    ? <CardFooter className="d-flex justify-content-between">
                        {props.isPublished
                            ? <Button size="sm" color="secondary" onClick={props.onTogglePublish}>Unpublish</Button>
                            : <Button size="sm" color="success" onClick={props.onTogglePublish}>Publish</Button>
                        }
                        <Button size="sm" color="danger" onClick={props.onDelete}>Delete</Button>
                    </CardFooter>
                    : null
                }
            </Card>
        </Col>
    );
};

export default CocktailsList;
