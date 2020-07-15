import React from 'react';
// import Component from 'react';
// import TestRenderer from 'react-test-renderer';
import { configure, shallow,mount, render } from 'enzyme';
import { expect } from 'chai';
// import sinon from 'sinon';
// import App from './App';
import renderer from 'react-test-renderer';
import { createStore, reduxForm, BaseFieldHOC, Provider} from 'redux'
import configureStore from 'redux-mock-store';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from "react-router-dom";
// import createMockStore from 'redux-mock-store';

configure({ adapter: new Adapter() });
const mockStore = configureStore([]);
//Testing the landing page
describe('<Landing/>', () => {
  //Test that it lands on the Loading Page
  it('renders the Landing Page', () => {
    const wrapper = shallow(<Landing />);
    const welcome = <p className="flow-text grey-text text-darken-1">Get organized with us</p>;
    expect(wrapper.contains(welcome)).to.equal(true);
  }); 

  it('renders a Login and Register Link', () => {
    const wrapper = shallow(<Landing/>);
    const moto = <span style={{ fontFamily: "monospace" }}>Life is crazy</span>
    expect(wrapper.contains(moto)).to.equal(true);
    const login = <Link
                title="mockTitle"
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable black accent-3t"
              >
                Log In
              </Link>;
    expect(wrapper.contains(login)).to.equal(true);
 
  const register = <Link
  to="/register"
  style={{
    width: "140px",
    borderRadius: "3px",
    letterSpacing: "1.5px"
  }}
  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
>
  Register
</Link>
 expect(wrapper.contains(register)).to.equal(true);
});
});


// Testing the dashboard page
describe('<Dashboard/>', () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore();
    component = renderer.create(
    <Provider store={store}>
      <Dashboard/>
    </Provider>
    );
  });
  

  it("should render with given state from Redux store", () =>{
    expect(JSON.stringify(component)).to.match.SnapShot();
  });

  // it('should dispatch an action on button click', () => {
    
  // });
});

// 
// const dash = shallow(<Provider store={store}>
//   <Dashboard />
// </Provider>);
// const task = <p className="flow-text grey-text text-darken-1">Create Tasks</p>;
// expect(dash.contains(task)).to.equal(true);
// });
// });
