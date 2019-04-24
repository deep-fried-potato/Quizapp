import React from "react"
import axios from "axios"

class CreateCourse extends React.Component{
  state={
    status_box_text:""
  }
  sendData = (event)=>{
    var token = localStorage.getItem("auth-token");
    var config = {
      headers:{'x-access-token':token}
    }
    var data ={
      cname:this.refs.cname.value
    }
    axios.post("http://localhost:8000/course/createcourse",data,config).then(res=>{
      const status_box_text = "Course has been created JoinKey : " + res.data.joinKey
      this.setState({status_box_text})
    })
  }

  render(){
    return(
      <div>
      <h1>Create Course</h1>
      <p>Please Enter Name of New Course</p>
      <input ref="cname" type="text"  />
      <button onClick={this.sendData} >Create Course</button>
      <p>{this.state.status_box_text}</p>
      </div>
    )
  }
}

export default CreateCourse
