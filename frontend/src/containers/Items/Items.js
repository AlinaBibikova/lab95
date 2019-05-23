import React, {Component} from 'react';
import {Row} from "reactstrap";
import {connect} from "react-redux";
import {fetchItems} from "../../store/actions/itemsActions";
import Loader from "../../components/UI/Loader/Loader";

class Items extends Component {

    componentDidMount() {
        this.props.fetchItems();
    }

    render() {
        return (
            <Row>
                {this.props.loading && <Loader/>}

            </Row>
        );
    }
}


const mapStateToProps = state => ({
    items: state.items.items,
    error: state.items.error,
    loading: state.items.loading
});

const mapDispatchToProps = dispatch => ({
    fetchItems: () => dispatch(fetchItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);