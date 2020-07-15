import React, { Component } from 'react';
import FacebookLogin from "react-facebook-login";


export default class Facebook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            name: '',
            email: '',
            userID: '',
        }
    }


    responseFacebook = response => {
        this.setState({
            isSignedIn: true,
            name: response.name,
            email: response.email,
            userID: response.userID,
        });
        console.log("This is the response: " + response + this.state.userID, this.state.name);
        let fbCreds = [response.email, response.userID, response.name]
        this.props.setfbCredential(fbCreds)
    }

    componentClicked = () => console.log("fb button clicked");


    render() {
        let fbLog;
        if (this.state.isLoggedIn) {
            console.log(this.response);
        }
        else {
            fbLog = (<FacebookLogin
                appId="535881784029676"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
            />)
        }
        return <div>{fbLog}</div>
    }
}