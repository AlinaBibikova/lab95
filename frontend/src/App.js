import React, {Component, Fragment} from 'react';
import './App.css';
import {NotificationContainer} from "react-notifications";
import Cocktails from "./containers/Cocktails/Cocktails";
import {logoutUser} from "./store/actions/usersActions";
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router";
import {Col, Container, Row} from "reactstrap";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Login from "./containers/Login/Login";

class App extends Component {
    render() {
        return (
            <Fragment>
                <NotificationContainer/>
                <header>
                    <Toolbar user={this.props.user}
                             logout={this.props.logoutUser}/>
                </header>
                <Container className="py-5">
                    <Row>
                        <Col xs="12" md="12">
                            <Switch>
                                 <Route path="/" exact component={Cocktails}/>
                                  <Route path="/login" component={Login}/>
                            </Switch>
                        </Col>
                    </Row>
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
