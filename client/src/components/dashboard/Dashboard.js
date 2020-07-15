import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Tdl from '../lists/Tdl';
// import TasksList from '../pages/TasksList'
// import ListTasks from '../pages/ListTasks'
import SimpleTable from './SimpleTable';
import MapLoader from './MapLoader'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Tasks: '',
      renderView: 0
    }
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  getList = (Tasks) => {
    this.setState({
      Tasks: Tasks
    })
  }

  clickBtn = e => {
    console.log(this.state.renderView)
    this.setState({
      renderView: +1
    })
  }

  clickBtn2 = e => {
    console.log(this.state.renderView)
    this.setState({
      renderView: -1
    })
  }
  
  render() {
    const { user } = this.props.auth;
    switch(this.state.renderView){
      case 1:
        return (
          <div text-align="center">
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="landing-copy col s12 center-align">
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                </h4>
                <br/>
                <SimpleTable getList={this.getList}/>
                <br/>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button> 
                <br></br>
                <br></br>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.clickBtn2}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Hide Maps
                </button> 
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
              <MapLoader Tasks={this.state.Tasks}></MapLoader> 
          </div>
        );
      default:
        return (
          <div text-align="center">
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="landing-copy col s12 center-align">
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                </h4>
                <br/>
                <SimpleTable getList={this.getList}/>
                <br/>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button> 
                <br></br>
                <br></br>
                <button
                  style={{
                    width: "550px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.clickBtn}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Load Maps (Location Permissions Required)
                </button> 
              </div>
            </div>
          </div>
          </div>
        ); 
    }
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(Dashboard);

