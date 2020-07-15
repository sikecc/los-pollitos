import React, { Component } from 'react';
import { GoogleLogin } from "react-google-login";

const responseGoogle = (response) => {
    console.log(response);
}

export default class Google extends Component {
    state = {
        name: '',
        email: '',
        isSignedIn: false,
        clientID: '',
    }

    render() {
        let googleLog;
        if (this.state.isLoggedIn) {
            googleLog = null;
        }
        else {
            googleLog = (<GoogleLogin
                clientId=" 741557801732-1p1q8vcqs6h9t3s347pvkunjsb0sfuo0.apps.googleusercontent.com "
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />)
        }
        return <div>{googleLog}</div>
    }
}