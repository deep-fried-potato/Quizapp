import React from "react";
import axios from "axios";

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
          Username : {this.props.data.username} Email:{this.props.data.email}<br />Marks: {this.props.data.marks}<br />response: {this.props.data.response}<br />Percentile: {this.getPercentile(this.props.markslist,this.props.data.marks)}
        </div>
      )
    }
}

class QuizResults extends React.Component{

  state = {
    resultlist: [],
    markslist:[]
  }


  componentDidMount(){
    const {quizid} = this.props.match.params
    var token = localStorage.getItem('auth-token')
    var config={
      headers:{'x-access-token':token}
    };
    axios.get(`http://10.0.36.104:8000/quiz/quizresults/`+this.props.match.params.quizid,config).then(res=>{
      const resultlist = res.data
      this.setState({resultlist})
    })
    axios.get(`http://10.0.36.104:8000/quiz/quizmarksall/`+this.props.match.params.quizid,config).then(res=>{
      const markslist = res.data
      this.setState({markslist})
      console.log(markslist)
    })
  }
  render(){
    var result_container_list = this.state.resultlist.map((result_object)=>(
      <ResultContainer data={result_object} markslist={this.state.markslist} />
    ));
    return(
      <div>
        <h1>Results</h1>
        <div>{result_container_list}</div>
      </div>

    )

  }
}

export default QuizResults
