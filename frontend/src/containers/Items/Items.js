import React, {Component} from 'react';
import {Row} from "reactstrap";
import {connect} from "react-redux";
import {togglePublish, deleteItem, fetchItems} from "../../store/actions/itemsActions";
import Loader from "../../components/UI/Loader/Loader";
import ListItem from "../../components/ListItem/ListItem";

class Items extends Component {

    componentDidMount() {
        console.log(this.props.fetchItems());
        this.props.fetchItems();
    }

    render() {
        console.log(this.props.items);
        return (
            <Row>
                {this.props.loading && <Loader/>}

                {this.props.items.map(item => (
                    <ListItem
                        key={item._id}
                        id={item._id}
                        nameCocktail={item.nameCocktail}
                        image={item.image}
                        recipe={item.recipe}
                        ingredients={item.ingredients}
                        user={this.props.user}
                        onDelete={() => this.props.deleteItem(item._id)}
                        onTogglePublish={() => this.props.togglePublish(item._id)}
                    />
                ))}
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    user: state.users.user,
    items: state.items.items,
    error: state.items.error,
    loading: state.items.loading
});

const mapDispatchToProps = dispatch => ({
    fetchItems: () => dispatch(fetchItems()),
    deleteItem: id => dispatch(deleteItem(id)),
    togglePublish: (id, data) => dispatch(togglePublish(id, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);