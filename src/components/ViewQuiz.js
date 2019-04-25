import React from "react"
import axios from "axios"

class QuizInfo extends React.Component{
  state={
    quizdata:[],
    userinfo:[]
  }
  componentDidMount(){
    var token = localStorage.getItem('auth-token');
    var config = {
      headers:{'x-access-token':token}
    }
    axios.get("http://localhost:8000/api/auth/me",config).then(res=>{
      const userinfo = res.data[0]
      this.setState({userinfo})
    })
    axios.get("http://localhost:8000/quiz/getquiz/"+this.props.match.params.quizid,config).then(res=>{
      const quizdata = res.data[0]
      this.setState({quizdata})
    })
  }
  render(){
    return(
      <div>
      <h1>Quiz Details:{this.state.quizdata.quizname} </h1>
      <pre>{JSON.stringify(this.state.quizdata,null,2)}</pre>
      </div>
    )
  }
}
export default QuizInfo
