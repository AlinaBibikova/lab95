import React, {Component} from 'react';
import {NotificationManager} from 'react-notifications';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {facebookLogin} from "../../store/actions/usersActions";

class Facebooklogin extends Component {
    facebookLogin = data => {
        if (data.error) {
            NotificationManager.error('Something went wrong!')
        } else if (!data.name) {
            NotificationManager.warning('You passed cancel');
        } else {
            this.props.facebookLogin(data);
        }
    };

    render() {
        return (
            <FacebookLoginButton
                appId="545138079223618"
                callback={this.facebookLogin}
                fields="name,email,picture"
                render={renderProps => (
                    <Button onClick={renderProps.onClick} color="info">
                        Login with facebook
                    </Button>
                )}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    facebookLogin: userData => dispatch(facebookLogin(userData))
});


export default connect(null, mapDispatchToProps)(Facebooklogin);