import React, { Component } from 'react'
import api from '../../api'

import styled from 'styled-components'

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


class TasksUpdate extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            userid: '',
            task:'',
            completed: '',
            date: '',
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

    handleUpdateTask = async () => {
        const { id, userid, task, completed, date} = this.state
        const arrayDate = date
        const payload = { userid, task, completed, date: arrayDate}

        api.updateTaskById(id, payload).then(res => {
            window.alert(`Task updated successfuly`)
            this.setState({
                userid: userid,
                task: '',
                completed: '',
                date: date,
            })
        })
        window.location.href = `/dashboard`
    }

    componentDidMount = async () => {
        const {id} = this.state
        const task = await api.getTaskById(id)

        this.setState({
            userid: task.data.data.userid,
            task: task.data.data.task,
            completed: task.data.data.completed,
            date: task.data.data.date,
        })
    }


    render() {
        const { task, completed } = this.state
        return (
           <Wrapper>
               <Title>Create Task</Title>

               {/* <Label>UserId: </Label>
                <InputText
                type="text"
                value={userid}
                onChange={this.handleChangeInputUserid}
                /> */}

                <Label>Task: </Label>
                <InputText
                type="text"
                value={task}
                onChange={this.handleChangeInputTask}
                />

                <Label>Completed: </Label>
                <InputText
                type="text"
                value={completed}
                onChange={this.handleChangeInputCompleted}
                />

                {/* <Label>Date: </Label>
                <InputText
                type="Date"
                value={date}
                onChange={this.handleChangeInputDate}
                /> */}

                <Button onClick={this.handleUpdateTask}>Update Task</Button>
                <CancelButton href={'/lists/list'}>Cancel</CancelButton>
           </Wrapper>
        )
    }
}

export default TasksUpdate