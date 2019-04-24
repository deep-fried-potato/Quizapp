import React from "react"
import axios from "axios"

class JoinCourse extends React.Component{
  state={
    status_box_text:""
  }
  sendData = (event)=>{
    var token = localStorage.getItem("auth-token");
    var config = {
      headers:{'x-access-token':token}
    }
    var data ={
      joinKey:this.refs.joinKey.value
    }
    axios.post("http://localhost:8000/course/joincourse",data,config).then(res=>{
      const status_box_text = "Course has been added"
      console.log(res)
      this.setState({status_box_text})
    }).catch(err=>{
      const status_box_text = "Invalid Joinkey"
      console.log(err)
      this.setState({status_box_text})
    })
  }

  render(){
    return(
      <div>
      <h1>Join Course</h1>
      <p>Please Enter JoinKey of New Course</p>
      <input ref="joinKey" type="text"  />
      <button onClick={this.sendData} >Join Course</button>
      <p>{this.state.status_box_text}</p>
      </div>
    )
  }
}

export default JoinCourse
