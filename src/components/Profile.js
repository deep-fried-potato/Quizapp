import React from "react"
import axios from "axios"

class CourseContainer extends React.Component{
  render(){
    return(
      <div>{this.props.data.cname}</div>
    )
  }
}

class Profile extends React.Component{
  state={
    userinfo:[],
    courses:[]
  }
  componentDidMount(){
    var token = localStorage.getItem('auth-token');
    var config = {
      headers:{'x-access-token':token}
    }
    axios.get("http://localhost:8000/api/auth/me",config).then(res=>{
      const userinfo = res.data[0]
      console.log(userinfo)
      this.setState({userinfo})
    })
    axios.get("http://localhost:8000/course/listgroups",config).then(res=>{
      const courses = res.data
      this.setState({courses})
    })

  }

  render(){
    var course_container_list = this.state.courses.map((course_object)=>(

      <a href={"/courses/"+course_object.cid} ><CourseContainer data={course_object} /></a>
    ))
    return(
      <div>
      <h1>Profile</h1>
      <div>{this.state.userinfo.userid},{this.state.userinfo.username},{this.state.userinfo.email}</div>
      <h2>Your Courses</h2>
      <div>{course_container_list}</div>
      <p>
        {this.state.userinfo.isTeacher ? (<a href="/createcourse">Create course</a>):(<a href="/joincourse">Join a course</a>)}
      </p>
      </div>
    )
  }

}

export default Profile
