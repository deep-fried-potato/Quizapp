import React from "react"
import axios from "axios"

class StartQuizPage extends React.Component{
  state={
    status_box_text:"",
    userinfo:[],
    quizdata:[],
    quizstarted:false
  }
  sendData = (event)=>{
    var token = localStorage.getItem("auth-token");
    var config = {
      headers:{'x-access-token':token}
    }
    var data = {
      accesskey:this.refs.accesskey.value,
      quizid:this.props.match.params.quizid
    }
    axios.post("http://10.0.36.104:8000/quiz/startquiz",data,config).then(res=>{
      const status_box_text="Quiz Started.You may take the quiz"
      const quizstarted = true
      this.setState({status_box_text})
      this.setState({quizstarted})
    }).catch(err=>{
      const status_box_text="Invalid AccessKey"
      this.setState({status_box_text})
    })
  }
  componentDidMount(){
    var token = localStorage.getItem('auth-token');
    var config = {
      headers:{'x-access-token':token}
    }
    axios.get("http://10.0.36.104:8000/api/auth/me",config).then(res=>{
      const userinfo = res.data[0]
      this.setState({userinfo})
    })
    axios.get("http://10.0.36.104:8000/quiz/getquiz/"+this.props.match.params.quizid,config).then(res=>{
      const quizdata = res.data[0]
      this.setState({quizdata})
    })
  }
  render(){
    return(
      <div>
        <h1> You are about to start quiz:{this.state.quizdata.quizname} </h1>
        <p>Enter the Access Key </p>
        <input type="text" ref="accesskey" /><button onClick={this.sendData} >Start Quiz</button>
        <p>{this.state.status_box_text}</p>
        <div>{this.state.quizstarted ? (<a href={"/quiz/"+this.props.match.params.quizid}>Quiz Link</a>):("")}</div>
      </div>
    )
  }
}

export default StartQuizPage
