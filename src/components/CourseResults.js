import React from "react";
import axios from "axios";
import {Line} from 'react-chartjs-2'

class CourseResultContainer extends React.Component{
state={
  userinfo:[],
  avglist:[],
  highestlist:[],
  quiznamelist:[],
  yourlist:[1,2,3,4,5],
  resultslist:[]
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
  axios.get("http://10.0.36.104:8000/quiz/courseresults/"+this.props.match.params.courseid,config).then(res=>{
    const avglist = res.data.avglist
    const highestlist = res.data.highestlist
    const quiznamelist= res.data.quiznamelist
    const yourlist=res.data.yourlist
    const resultslist=res.data.resultslist
    this.setState({avglist})
    this.setState({highestlist})
    this.setState({quiznamelist})
    this.setState({yourlist})
    this.setState({resultslist})
  })
}
  predictedMarks = (yourlist)=>{
    var pred = 2*yourlist[yourlist.length -1] - yourlist[yourlist.length -2]
    return "Predicted Marks: "+ pred
  }

render(){
  const teacherdata = {
  labels: this.state.quiznamelist,
  datasets: [
    {
      label: 'Average Marks',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: this.state.avglist
    },
    {
      label: 'Highest Marks',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,101,101,0.4)',
      borderColor: 'rgba(255,101,101,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: this.state.highestlist
    }
  ]
};
const studentdata = {
labels: this.state.quiznamelist,
datasets: [
  {
    label: 'Average Marks',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: this.state.avglist
  },
  {
    label: 'Highest Marks',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(255,101,101,0.4)',
    borderColor: 'rgba(255,101,101,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: this.state.highestlist
  },
  {
    label: 'Your Marks',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(0,255,101,0.4)',
    borderColor: 'rgba(0,255,101,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: this.state.yourlist
  }
]
};
if(this.state.resultslist){
  var result_container_list = this.state.resultslist.map((result_object)=>(
    <div>{result_object.quizname}:{result_object.marks?(result_object.marks):(0)}</div>
  ));
}

  return(
    <div >
    <h1>Course Results</h1>
    <div style={{height:"40%",width:"50%"}} >
    <Line data={this.state.userinfo.isTeacher?(teacherdata):(studentdata)} />

    </div>
    <div>
      {this.state.userinfo.isTeacher?("-"):(this.predictedMarks(this.state.yourlist))}
    </div>
      {result_container_list}
    </div>
  )
}

}

export default CourseResultContainer
