import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchCocktail} from "../../store/actions/cocktailsActions";
import Loader from "../../components/UI/Loader/Loader";
import {apiURL} from "../../constants";
import {Col} from "reactstrap";

class Cocktail extends Component {

    componentDidMount() {
        this.props.fetchCocktail(this.props.match.params.id);
    }

    render() {
        const cocktail = this.props.cocktail;

        return (
            <div>
                {this.props.loading && <Loader/>}

                <h3 className="mb-3">{cocktail.name}</h3>

                {cocktail.image && (
                    <img src={`${apiURL}/uploads/${cocktail.image}`} className="item-img" alt={cocktail.name}/>
                )}

                {cocktail.recipe && (
                    <p>
                        <span className="text-muted">Recipe:</span><br/>
                        {cocktail.recipe}
                    </p>
                )}

                {cocktail.ingredients ? <Col sm={9}>
                    <span className="text-muted">ingredients:</span><br/>
                {cocktail.ingredients.map((ingr, index) => (
                    <p key={index}>
                        <span>{ingr.name}</span>
                        <span>{ingr.amount}</span>
                    </p>
                ))}
                    </Col> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cocktail: state.cocktails.cocktail,
    user: state.users.user,
    error: state.cocktails.error,
    loading: state.cocktails.loading
});

const mapDispatchToProps = dispatch => ({
    fetchCocktail: cocktailId => dispatch(fetchCocktail(cocktailId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktail);