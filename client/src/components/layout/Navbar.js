import React, { Component } from "react";
// import { Link } from "react-router-dom";
import styled from 'styled-components'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

// const List = styled.div.attrs({
//     className: 'navbar-nav mr-auto',
// })``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
  margin-bottom: 20 px;
`

class Navbar extends Component {
  render() {
    // const { user } = this.props.auth;
    return (
      <div className="navbar-fixed">
        <Nav>
        <React.Fragment>
          {/* If need be change item back to link to make it a link */}
        <Item
              
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              Los Pollitos
            </Item>
              <Collapse>
                    {/* <List>
                        <Item>
                            <Link to={{pathname: `/lists/list/${user.id}`}}
                            style={{
                              fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo left black-text"
                            >
                                List Tasks
                            </Link>
                        </Item>
                        <Item>
                        <Link to="/lists/create" 
                            style={{
                              fontFamily: "monospace"
                            }}
                            className="col s5 brand-logo right black-text"
                            >
                                Create Tasks
                            </Link>
                        </Item>
                    </List> */}
                  </Collapse>
            </React.Fragment>
            </Nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(Navbar);
