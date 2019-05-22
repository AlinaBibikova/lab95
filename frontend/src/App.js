import React, {Component, Fragment} from 'react';
import './App.css';
import {NotificationContainer} from "react-notifications";
import Cocktails from "./containers/Cocktails/Cocktails";
import {logoutUser} from "./store/actions/usersActions";
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router";
import {Container} from "reactstrap";
import Toolbar from "./containers/UI/Toolbar/Toolbar";

class App extends Component {
    render() {
        return (
            <Fragment>
                <NotificationContainer/>
                <header>
                    <Toolbar user={this.props.user}
                             logout={this.props.logoutUser}/>
                </header>
                <Container style={{marginTop: '20px'}}>
                    <Switch>
                        <Route path="/" exact component={Cocktails}/>
                    </Switch>
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
