import React, {Component, Fragment} from 'react';
import './App.css';
import {NotificationContainer} from "react-notifications";
import Cocktails from "./containers/Cocktails/Cocktails";

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

export default App;
