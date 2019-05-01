import React from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import ResultContainer from "./ResultContainer";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    minWidth: 275,
    display: "inline-block",
    backgroundColor: "#82b1ff"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class QuizResults extends React.Component {
  state = {
    resultlist: [
      {
        marks: 0
      }
    ],
    markslist: [],
    studentdata: [],
    teacherdata: [],
    userinfo: []
  };

  componentDidMount() {
    const { quizid } = this.props.match.params;
    var pagetitle = document.getElementById("pagetitle");
    pagetitle.innerHTML = "Results";
    var token = localStorage.getItem("auth-token");
    var config = {
      headers: { "x-access-token": token }
    };
    axios.get("http://10.0.36.104:8000/api/auth/me", config).then(res => {
      const userinfo = res.data[0];
      console.log(userinfo);
      this.setState({ userinfo });
    });
    axios
      .get(
        `http://10.0.36.104:8000/quiz/quizresults/` +
          this.props.match.params.quizid,
        config
      )
      .then(res => {
        var resultlist = res.data;
        this.setState({ resultlist });
        console.log(resultlist);
      });
    axios
      .get(
        `http://10.0.36.104:8000/quiz/quizmarksall/` +
          this.props.match.params.quizid,
        config
      )
      .then(res => {
        const markslist = res.data;
        this.setState({ markslist });
        console.log(markslist);
      });
  }
  render() {
    const studentdata = {
      labels: ["Your Score", "Class Average", "Highest", "Lowest"],
      datasets: [
        {
          label: "Class marks",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [
            this.state.resultlist[0].marks,
            this.state.markslist.reduce((a, b) => a + b, 0) /
              this.state.markslist.length,
            Math.max(...this.state.markslist),
            Math.min(...this.state.markslist)
          ]
        }
      ]
    };
    const teacherdata = {
      labels: ["Class Average", "Highest", "Lowest"],
      datasets: [
        {
          label: "Class marks",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [
            this.state.markslist.reduce((a, b) => a + b, 0) /
              this.state.markslist.length,
            Math.max(...this.state.markslist),
            Math.min(...this.state.markslist)
          ]
        }
      ]
    };
    var result_container_list = this.state.resultlist.map(result_object => (
      <span>
        <ResultContainer
          data={result_object}
          markslist={this.state.markslist}
        />
      </span>
    ));
    return (
      <div
        style={{
          backgroundColor: "#e0e0e0",
          position: "absolute",
          top: 0,
          width: "102%",
          minHeight: "100%",
          marginLeft: "-20px"
        }}
      >
        <div
          style={{
            marginTop: "3%",
            width: "75%",
            height: "10%",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          <Typography
            component="h2"
            variant="display1"
            gutterBottom
            style={{
              paddingTop: "5%",
              paddingBottom: "3%"
            }}
          >
            Results
          </Typography>

          <Bar
            data={this.state.userinfo.isTeacher ? teacherdata : studentdata}
            width={50}
            height={20}
            options={{
              maintainAspectRatio: true
            }}
          />
          <div>{result_container_list}</div>
        </div>
      </div>
    );
  }
}

QuizResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuizResults);
