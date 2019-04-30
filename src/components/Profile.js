import React from "react";
import axios from "axios";
import JoinCourse from "./JoinCourse";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1
  }
});

class CourseContainer extends React.Component {
  render() {
    return <div>{this.props.data.cname}</div>;
  }
}

class Profile extends React.Component {
  state = {
    userinfo: [],
    courses: []
  };
  componentDidMount() {
    var pagetitle = document.getElementById("pagetitle");
    pagetitle.innerHTML = "Profile";
    var token = localStorage.getItem("auth-token");
    var config = {
      headers: { "x-access-token": token }
    };
    axios.get("http://localhost:8000/api/auth/me", config).then(res => {
      const userinfo = res.data[0];
      console.log(userinfo);
      this.setState({ userinfo });
    });
    axios.get("http://localhost:8000/course/listgroups", config).then(res => {
      const courses = res.data;
      this.setState({ courses });
    });
  }

  render() {
    const { classes } = this.props;

    var course_container_list = this.state.courses.map(course_object => (
      <a href={"/courses/" + course_object.cid}>
        <CourseContainer data={course_object} />
      </a>
    ));

    return (
      <div
        style={{
          backgroundColor: "#e0e0e0",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          bottom: 0,
          marginLeft: "-9px",
          objectFit: "cover",
          textAlign: "center"
        }}
      >
        <div
          style={{
            paddingTop: "6%",
            width: "50%",
            display: "inline-block"
          }}
        >
          <Paper className={classes.paper} elevation={1}>
            <Typography
              component="h2"
              variant="display3"
              gutterBottom
              style={{
                paddingTop: "40px"
              }}
            >
              Profile
            </Typography>
            <Typography
              component="h2"
              variant="display1"
              gutterBottom
              style={{
                fontSize: "18px",
                paddingRight: "80px"
              }}
              align="right"
            >
              PrashantRaj
            </Typography>
            <Typography
              component="h2"
              variant="display1"
              gutterBottom
              style={{
                paddingTop: "0px",
                fontSize: "14px",
                paddingRight: "80px"
              }}
              align="right"
            >
              prashantraj18198@gmail.com
            </Typography>
            {/* <div>
              {this.state.userinfo.username},{this.state.userinfo.email}
            </div> */}
            <Typography
              component="h2"
              variant="display1"
              gutterBottom
              style={{
                paddingTop: "20px",
                fontWeight: "lighter",
                paddingLeft: "80px"
              }}
              align="left"
            >
              Your Courses
            </Typography>

            <div>{course_container_list}</div>
            <p>
              {this.state.userinfo.isTeacher ? (
                <a href="/createcourse">Create course</a>
              ) : (
                <JoinCourse />
              )}
            </p>
          </Paper>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
