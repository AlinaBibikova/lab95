import React, {Component, Fragment} from 'react';
import {NotificationContainer} from "react-notifications";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Container} from "reactstrap";

import {logoutUser} from "./store/actions/usersActions";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Routes from "./Routes";

class App extends Component {

    render() {
        return (
            <Fragment>
                <NotificationContainer/>
                <header>
                    <Toolbar user={this.props.user}
                             logout={this.props.logoutUser}
                    />
                </header>
                <Container className="py-5">
                    <Routes user={this.props.user} />
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
