import React, { Component } from 'react'
import MaterialTable from 'material-table';
import api from "../../api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import RM from '../../api/Rememberthemilk';

class SimpleTable extends Component {
  constructor(props){
    super(props)
    this.state ={
      tasks: [],
      columns: [],
      isLoading: false,
      state: null,
      setState: null,
      userid: '',
      task: '',
      completed: '',
      date: ''
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
    // RM()
    this.props.getList(tasks.data.data)
  });
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

  const { user } = this.props.auth;
  const userName = user.name.split(" ")[0];
  const {tasks} = this.state
  console.log('TCL: TaskList -> render -> Lists', tasks); 
  const columns =  [
    // {
    //     title: 'ID',
    //     field: '_id',
    // },
    // {   
    //     title: 'UserID',
    //     field: 'userid',
    // },
    {
        title: 'Task',
        field: 'task',
        cellStyle: {
          width: 1000,
          maxWidth: 2000,
          fontSize: 20,
        },
        headerStyle: {
          width:1000,
          maxWidth: 2000,
          fontSize: 20,
        },
    },
    // {   
       
    //     title: 'Completed',
    //     field: 'completed',
    // },
    // {
    //     title: 'Date',
    //     field: 'date',
    // },
  ];

  return (
    <MaterialTable
      title={userName + "Task's"}
      columns={columns}
      data={tasks}
      options={{
        actionsCellStyle: {
        backgroundColor: "white",
        color: "black",
        fontSize: 20,
      },

      headerStyle: { backgroundColor: "white", color: "black", fontSize:20},
    }}

      editable={{
      onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              newData.userid = user.id;
              newData.completed = false;
              newData.date = Date.now;  
              api.insertTasks(newData).then(res => {
                // console.log(res)
                window.alert(`Task inserted successfuly`)
                // let poop = this.state.tasks;
                this.setState({
                    userid: newData.userid,
                    task: newData.task,
                    completed: newData.completed,
                    date: newData.date,
                    // tasks: poop.push(newData)
                    //Push it into tasks so that it doesnt always reload
                })
                
            })
            window.location.reload()
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              console.log(oldData)
              api.updateTaskById(oldData._id, newData).then(res => {
                window.alert(`Task updated successfuly`)
                this.setState({
                    userid: oldData.userid,
                    task: newData.task,
                    completed: oldData.completed,
                    date: oldData.date,
                })
            })
            window.location.reload()
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              api.deleteTaskById(oldData._id)
              window.location.reload()
            }, 600);
          }),
      }}
    />

    
     );
    }
  }

  SimpleTable.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
    mapStateToProps,
    { logoutUser },
  )(SimpleTable);