import React from "react"
import axios from "axios"

class QuizContainer extends React.Component{
  render(){
    return(
      <div>Quiz Name:{this.props.data.quizname}<br/>Start Time:{this.props.data.starttime} | End time:{this.props.data.endtime}</div>
    )
  }
}

class Course extends React.Component{
  state={
    quizlist:[],
    courseinfo:[],
    userinfo:[]
  }
  componentDidMount(){
    var token = localStorage.getItem("auth-token");
    var config = {
      headers:{'x-access-token':token}
    }
    axios.get("http://localhost:8000/api/auth/me",config).then(res=>{
      const userinfo = res.data[0]
      console.log(userinfo)
      this.setState({userinfo})
    })
    axios.get("http://localhost:8000/quiz/listquizzes/" + this.props.match.params.cid,config).then(res=>{
      const quizlist = res.data
      this.setState({quizlist})
    })
    axios.get("http://localhost:8000/course/courseinfo/" + this.props.match.params.cid,config).then(res=>{
      const courseinfo = res.data[0]
      this.setState({courseinfo})
    })
  }
  render(){
    var quiz_container_list = this.state.quizlist.map((quiz_object)=>(
      <div>
      <a href={this.state.userinfo.isTeacher ? ("/viewquiz/"+quiz_object.quizid):("/startquiz/"+quiz_object.quizid)} ><QuizContainer data={quiz_object} /></a>
      <a href={"/quizresults/"+quiz_object.quizid}><p>View Results</p></a>
      </div>
    ))
    return(
      <div>
      <h1>Welcome to course {this.state.courseinfo.cname}</h1>
      <h2>Instructor: {this.state.courseinfo.name} </h2>
      <p>JoinKey: {this.state.courseinfo.joinKey}</p>
      <p>Email : {this.state.courseinfo.email}</p>
      <p>Quizzes: </p>
      <div>{quiz_container_list}</div>
      </div>
    )
  }

}

export default Course
