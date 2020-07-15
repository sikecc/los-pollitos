import React, { Component } from 'react'
import api from "../../api";
import ReactTable from 'react-table-v6';
import styled from 'styled-components';
import 'react-table-v6/react-table.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Wrapper = styled.div`padding: 0 40px 40px 40px;`


const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

//Update a Task
class TasksUpdate extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/lists/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

//Delete a Task
class TasksDelete extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the task ${this.props.id} permanently?`,
            )
        ) {
            api.deleteTaskById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}
class ListTasks extends Component{

    constructor(props){
        super(props)
        this.state ={
          tasks: [],
          columns: [],
          isLoading: false,
        }
    }

    componentDidMount = async () =>{
        const { user } = this.props.auth;
        this.setState({isLoading:true})
        await api.getListById(user.id).then(tasks => {
          this.setState({
            tasks: tasks.data.data,
            isLoading: false,
          });
        });
    }

    render(){
        const {tasks, isLoading} = this.state
        console.log('TCL: UserList -> render -> Lists', tasks); 
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {  
                Header: 'UserID',
                accessor: 'userid',
                filterable: true,
            },
            {
                Header: 'Task',
                accessor: 'task',
                filterable: true,
            },
            {   
                id:'completed',
                Header: 'Completed',
                accessor: d => d.completed.toString(),
                filterable: true,
            },
            {
                Header: 'Date',
                accessor: 'date',
                // Cell: props => <span className='date'>{props.value.join()}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <TasksDelete id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <TasksUpdate id={props.original._id} />
                        </span>
                    )
                },
            },
        ]   
        
        let showTable = false;
        if(tasks.length){
            showTable = true;
        }
        return (
            <Wrapper>
            {showTable && (
                <ReactTable
                    data={tasks}
                    columns={columns}
                    loading={isLoading}
                    defaultPageSize={10}
                    showPageSizeOptions={true}
                    minRows={0}
                />
            )}
            </Wrapper>
        );
    }
}

ListTasks.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
    mapStateToProps,
    { logoutUser },
  )(ListTasks);