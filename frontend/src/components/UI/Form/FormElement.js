import React from 'react';
import {FormFeedback, FormGroup, Input, Label} from "reactstrap";

const FormElement = props => {
    return (
        <FormGroup>
            {props.title && <Label for={props.propertyName}>{props.title}</Label>}
            <Input
                type={props.type}
                id={props.propertyName}
                name={props.propertyName}
                value={props.value}
                invalid={!!props.error}
                onChange={props.onChange}
                required={props.required}
                placeholder={props.placeholder}
                autoComplete={props.autoComplete}
            />
            {props.error && (
                <FormFeedback>
                    {props.error}
                </FormFeedback>
            )}
        </FormGroup>
    );
};

export default FormElement;
