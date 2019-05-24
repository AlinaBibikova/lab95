import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchCocktails} from "../../store/actions/cocktailsActions";
import Loader from "../../components/UI/Loader/Loader";
import CocktailsListItem from "../../components/ListCocktail/CocktailsListItem";
import {Row} from "reactstrap";

class MyCocktails extends Component {
    componentDidMount() {
        this.props.fetchCocktails(this.props.user._id);
    }


    render() {

        return (
            <Row>
                {this.props.loading && <Loader/>}

                {this.props.cocktails.map(cocktail => (
                    <CocktailsListItem
                        key={cocktail._id}
                        id={cocktail._id}
                        name={cocktail.name}
                        image={cocktail.image}
                        isPublished={cocktail.isPublished}
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
    fetchCocktails: user => dispatch(fetchCocktails(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCocktails);
