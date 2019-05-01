import React from "react";
import axios from "axios";
import JoinCourse from "./JoinCourse";
import CreateCourse from "./CreateCourse";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  card: {
    minWidth: 275,
    display: 'inline-block',
    backgroundColor: '#42a5f5'
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

class CourseContainer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          paddingTop: "15px",
          paddingBottom: "15px",
          width: "50%",
          textAlign: "center",
          paddingLeft: "180px"
        }}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Course id: {this.props.data.cid}
            </Typography>
            <Typography variant="h5" component="h2">
              {this.props.data.cname}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {this.props.data.name}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

CourseContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CourseContainer);
