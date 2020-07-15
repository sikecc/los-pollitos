import React, { Component } from 'react'
import api from '../../api'

import styled from 'styled-components'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class TasksInsert extends Component {
    constructor(props){
        super(props)

        this.state = {
            userid: '',
            task: '',
            completed: '',
            date: ''
        }
    }

    handleChangeInputUserid = async event => {
        const userid = event.target.value
        this.setState({userid})
    }

    handleChangeInputTask = async event => {
        const task = event.target.value
        this.setState({ task })
    }

    handleChangeInputCompleted = async event => {
        const completed = event.target.value
        this.setState({ completed })
    }

    handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    }

    handleIncludeTask = async () => {
        const { user } = this.props.auth;
        const { task, completed, date} = this.state
        // const arrayDate = Date.now
        const payload = { userid: user.id, task, completed: false, date: Date.now}

        api.insertTasks(payload).then(res => {
            window.alert(`Task inserted successfuly`)
            this.setState({
                userid: user.id,
                task: '',
                completed: completed,
                date: date,
            })
        })
    }

    render() {
        const {task} = this.state
        return (
            
            <Wrapper>
                <Title>Create Task</Title>
        
                <Label>Task: </Label>
                <InputText
                type="text"
                value={task}
                onChange={this.handleChangeInputTask}
                />

                {/* <Label>Date: </Label>
                <InputText
                type="text"
                value={date}
                onChange={this.handleChangeInputDate}
                /> */}

                <Button onClick={this.handleIncludeTask}>Add Task</Button>
                <CancelButton href={'/lists/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}
TasksInsert.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
    mapStateToProps,
    { logoutUser },
  )(TasksInsert);