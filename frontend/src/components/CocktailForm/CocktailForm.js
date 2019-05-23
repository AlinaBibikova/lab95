import React, {Component} from 'react';
import {Button, Form} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class CocktailForm extends Component {
    state = {
        name: '',
        recipe: '',
        image: null,
        ingredients: []
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (this.state[key]) {
                formData.append(key, this.state[key]);
            }
        });

        this.props.addCocktail(formData);
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="name"
                    title="Cocktail name:"
                    type="text"
                    value={this.state.name}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('name')}
                />

                <FormElement
                    propertyName="ingredients"
                    title="Ingredients:"
                    type="text"
                    value={this.state.ingredients}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('ingredients')}
                />

                <Button color="info">Add ingredient</Button>

                <FormElement
                    propertyName="recipe"
                    title="Recipe:"
                    type="textarea"
                    value={this.state.recipe}
                    onChange={this.inputChangeHandler}
                    error={this.getFieldHasError('recipe')}
                />

                <FormElement
                    propertyName="image"
                    title="Image:"
                    type="file"
                    onChange={this.fileChangeHandler}
                    error={this.getFieldHasError('image')}
                />

                <Button type="submit" color="info">Add cocktail</Button>

            </Form>
        );
    }
}

export default CocktailForm;