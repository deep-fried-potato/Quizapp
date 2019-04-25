import React from "react";
import axios from "axios";

class ResultContainer extends React.Component{
    render(){
      return(
        <div style={{margin:"20px"}}>
          Username : {this.props.data.username} Email:{this.props.data.email}<br />Marks: {this.props.data.marks}<br />response: {this.props.data.response}
        </div>
      )
    }
}

class QuizResults extends React.Component{

  state = {
    resultlist: []
  }


  componentDidMount(){
    const {quizid} = this.props.match.params
    var token = localStorage.getItem('auth-token')
    var config={
      headers:{'x-access-token':token}
    };
    axios.get(`http://localhost:8000/quiz/quizresults/`+this.props.match.params.quizid,config).then(res=>{
      const resultlist = res.data
      this.setState({resultlist})
    })
  }
  render(){
    var result_container_list = this.state.resultlist.map((result_object)=>(
      <ResultContainer data={result_object} />
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
