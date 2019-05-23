import React, {Component, Fragment} from 'react';
import CocktailForm from "../../components/CocktailForm/CocktailForm";
import {connect} from "react-redux";
import {addCocktail} from "../../store/actions/cocktailsActions";

class NewCocktail extends Component {
    render() {
        return (
            <Fragment>
                <h2 className="mb-4">Add new cocktail</h2>

                <CocktailForm
                    addCocktail={this.props.addCocktail}
                    error={this.props.error}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.cocktails.error
});

const mapDispatchToProps = dispatch => ({
    addCocktail: cocktailData => dispatch(addCocktail(cocktailData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCocktail);