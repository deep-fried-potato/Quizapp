import React from "react"
import axios from "axios"

class Profile extends React.Component{
  state={
    userinfo:[]
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

  }

  render(){
    return(
      <div>
      <h1>Profile</h1>
      {this.state.userinfo.userid},{this.state.userinfo.username},{this.state.userinfo.email}
      </div>
    )
  }

}

export default Profile
