import React, {Component} from 'react';
import {Button, Col, Form, Label} from "reactstrap";
import FormElement from "../UI/Form/FormElement";
import Row from "reactstrap/es/Row";

class CocktailForm extends Component {
    state = {
        name: '',
        recipe: '',
        image: null,
        ingredients: [
            {name: '', amount: '', key: Math.random().toString()},
        ]
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

    inputIngrChangeHandler = (event, index) => {
        const ingredient = {...this.state.ingredients[index]};
        ingredient[event.target.name] = event.target.value;

        const ingredients = [...this.state.ingredients];
        ingredients[index] = ingredient;

        this.setState({ingredients})
    };

    addIngredient = () => {
        this.setState({
            ingredients: [
                ...this.state.ingredients,
                {name: '', amount: '', key: Math.random().toString()}
            ]
        });
    };

    removeIngredient = index => {
        const ingredients = [...this.state.ingredients];

        ingredients.splice(index, 1);

        this.setState({ingredients});
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
        const newIngr = {...this.state};
        const formData = new FormData();



        Object.keys(newIngr).forEach(key => {
            if (newIngr[key]) {
                if (Array.isArray(newIngr[key])) {
                    newIngr[key] = JSON.stringify(newIngr[key]);
                }
                formData.append(key, newIngr[key]);
            }
        });

        this.props.addCocktail(formData);
    };

    render() {
        return (
            <div className="box p-3">
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="name"
                        title="Cocktail name:"
                        type="text"
                        value={this.state.name}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldHasError('name')}
                    />

                    <Label>Ingredients:</Label>
                    {this.state.ingredients.map((ingr, index) => (
                        <Row key={ingr.key}>
                            <Col xs="10" sm="5">
                                <FormElement
                                    propertyName="name"
                                    placeholder="Ingredient name:"
                                    type="text"
                                    value={this.state.ingredients[index].name}
                                    onChange={(event) => this.inputIngrChangeHandler(event, index)}
                                />
                            </Col>
                            <Col xs="10" sm="5">
                                <FormElement
                                    propertyName="amount"
                                    placeholder="Amount:"
                                    type="text"
                                    value={this.state.ingredients[index].amount}
                                    onChange={(event) => this.inputIngrChangeHandler(event, index)}
                                />
                            </Col>
                            {index > 0 &&
                                <Col xs="2">
                                    <Button color="danger" type="button" onClick={() => this.removeIngredient(index)}>x</Button>
                                </Col>
                            }
                        </Row>
                    ))}

                    <Button color="info" type="button" className="mb-3" onClick={this.addIngredient}>Add ingredient</Button>


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
            </div>
        );
    }
}

export default CocktailForm;
