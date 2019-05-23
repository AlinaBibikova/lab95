import React, {Component} from 'react';
import {Row} from "reactstrap";
import {connect} from "react-redux";
import {togglePublish, deleteCocktail, fetchCocktails} from "../../store/actions/cocktailsActions";
import Loader from "../../components/UI/Loader/Loader";
import ListCocktail from "../../components/ListCocktail/ListCocktail";

class Cocktails extends Component {

    componentDidMount() {
        this.props.fetchCocktails();
    }

    render() {
        console.log(this.props.cocktails);
        return (
            <Row>
                {this.props.loading && <Loader/>}

                {this.props.cocktails.map(cocktail => (
                    <ListCocktail
                        key={cocktail._id}
                        id={cocktail._id}
                        nameCocktail={cocktail.name}
                        image={cocktail.image}
                        user={this.props.user}
                        onDelete={() => this.props.deleteItem(cocktail._id)}
                        onTogglePublish={() => this.props.togglePublish(cocktail._id)}
                    />
                ))}
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    cocktails: state.cocktails.cocktails,
    error: state.cocktails.error,
    loading: state.cocktails.loading
});

const mapDispatchToProps = dispatch => ({
    fetchCocktails: () => dispatch(fetchCocktails()),
    deleteItem: id => dispatch(deleteCocktail(id)),
    togglePublish: id => dispatch(togglePublish(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);