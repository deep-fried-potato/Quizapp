import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});
class CourseResultContainer extends React.Component {
  state = {
    userinfo: [],
    avglist: [],
    highestlist: [],
    quiznamelist: [],
    yourlist: [1, 2, 3, 4, 5],
    resultslist: []
  };

  componentDidMount() {
    const { quizid } = this.props.match.params;
    var pagetitle = document.getElementById('pagetitle');
    pagetitle.innerHTML = 'Course Results'
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
        "http://10.0.36.104:8000/quiz/courseresults/" +
          this.props.match.params.courseid,
        config
      )
      .then(res => {
        const avglist = res.data.avglist;
        const highestlist = res.data.highestlist;
        const quiznamelist = res.data.quiznamelist;
        const yourlist = res.data.yourlist;
        const resultslist = res.data.resultslist;
        this.setState({ avglist });
        this.setState({ highestlist });
        this.setState({ quiznamelist });
        this.setState({ yourlist });
        this.setState({ resultslist });
      });
  }
  predictedMarks = yourlist => {
    var pred =
      2 * yourlist[yourlist.length - 1] - yourlist[yourlist.length - 2];
    return "Predicted Marks: " + pred;
  };

  render() {
    const { classes } = this.props;
    const teacherdata = {
      labels: this.state.quiznamelist,
      datasets: [
        {
          label: "Average Marks",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.avglist
        },
        {
          label: "Highest Marks",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255,101,101,0.4)",
          borderColor: "rgba(255,101,101,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
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
          label: "Average Marks",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.avglist
        },
        {
          label: "Highest Marks",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255,101,101,0.4)",
          borderColor: "rgba(255,101,101,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.highestlist
        },
        {
          label: "Your Marks",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(0,255,101,0.4)",
          borderColor: "rgba(0,255,101,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.yourlist
        }
      ]
    };
    if (this.state.resultslist) {
      var result_container_list = (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Quiz Name</TableCell>
                <TableCell align="right">Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.resultslist.map(result_object => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {result_object.quizname}
                  </TableCell>
                  <TableCell component="th" scope="row" align='right'>
                    {result_object.marks? result_object.marks: 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }

    return (
      <div
        style={{
          backgroundColor: "#e0e0e0",
          position: "absolute",
          top: 0,
          width: "101%",
          minHeight: "100%",
          marginLeft: "-20px"
        }}
      >
        <Typography
          component="h2"
          variant="display1"
          gutterBottom
          style={{
            paddingTop: "5%",
            paddingBottom: "1%"
          }}
        >
          Course Results
        </Typography>
        <div
          style={{
            width: "65%",
            minHeight: "10%",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          <Line
            data={this.state.userinfo.isTeacher ? teacherdata : studentdata}
          />
          <div>
          <Typography
            component="h2"
            variant="display1"
            gutterBottom
            style={{
              paddingTop: "5%",
              paddingBottom: "3%",
              fontSize: '24px'
            }}
          >
            {this.state.userinfo.isTeacher
              ? "-"
              : this.predictedMarks(this.state.yourlist)}
          </Typography>
          </div>
          {result_container_list}
        </div>
      </div>
    );
  }
}

CourseResultContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseResultContainer);
