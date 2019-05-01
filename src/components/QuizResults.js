import React from "react";
import axios from "axios";
import {Bar} from 'react-chartjs-2'

class ResultContainer extends React.Component{
  getPercentile(markslist,current_mark){
    var lessThanCurrent=0
    for(var mark in markslist){
      if (current_mark>mark) lessThanCurrent+=1
    }
    return (lessThanCurrent/markslist.length)*100
  }
    render(){
      return(
        <div style={{margin:"20px"}}>
          Username : {this.props.data.username} Email:{this.props.data.email}<br />Marks: {this.props.data.marks?(this.props.data.marks):(0)}<br />response: {this.props.data.response}<br />Percentile: {this.getPercentile(this.props.markslist,this.props.data.marks)}
        </div>
      )
    }
}

class QuizResults extends React.Component{

  state = {
    resultlist: [{
      marks:0
    }],
    markslist:[],
    studentdata:[],
    teacherdata:[],
    userinfo:[]
  }


  componentDidMount(){
    const {quizid} = this.props.match.params
    var token = localStorage.getItem('auth-token')
    var config={
      headers:{'x-access-token':token}
    };
    axios.get("http://10.0.36.104:8000/api/auth/me", config).then(res => {
      const userinfo = res.data[0];
      console.log(userinfo);
      this.setState({ userinfo });
    });
    axios.get(`http://10.0.36.104:8000/quiz/quizresults/`+this.props.match.params.quizid,config).then(res=>{
      var resultlist = res.data
      this.setState({resultlist})
      console.log(resultlist)
    })
    axios.get(`http://10.0.36.104:8000/quiz/quizmarksall/`+this.props.match.params.quizid,config).then(res=>{
      const markslist = res.data
      this.setState({markslist})
      console.log(markslist)

    })

  }
  render(){
    const studentdata={
      labels: ['Your Score', 'Class Average', 'Highest', 'Lowest'],
      datasets: [
        {
          label: 'Class marks',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [this.state.resultlist[0].marks,this.state.markslist.reduce((a,b) => a + b, 0) / this.state.markslist.length,Math.max(...this.state.markslist),Math.min(...this.state.markslist)]
        }
      ]
    }
    const teacherdata={
      labels: ['Class Average', 'Highest', 'Lowest'],
      datasets: [
        {
          label: 'Class marks',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [this.state.markslist.reduce((a,b) => a + b, 0) / this.state.markslist.length,Math.max(...this.state.markslist),Math.min(...this.state.markslist)]
        }
      ]
    }
    var result_container_list = this.state.resultlist.map((result_object)=>(

      <ResultContainer data={result_object} markslist={this.state.markslist} />
    ));
    return(
      <div>
        <h1>Results</h1>
        <div style={{width:"75%",height:"10%"}}>
        <Bar
          data={this.state.userinfo.isTeacher?(teacherdata):studentdata}
          width={50}
          height={20}
          options={{
            maintainAspectRatio: true
          }}
          />
        </div>
        <div>{result_container_list}</div>
      </div>

    )

  }
}

export default QuizResults
