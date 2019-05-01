import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import CssBaseline from "@material-ui/core/CssBaseline";
import Pagination from "material-ui-flat-pagination";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Navbar from "./Navbar";
import "./QuizPage.css";
import "../animate.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#616161"
    },
    secondary: {
      main: "#212121"
    }
  },
  shadows: ["none"]
});

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1
  },
  outsidePaper: {
    display: "inline-block",
    paddingBottom: "2%",
    width: "75%"
  },
  options: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1
  },
  group: {
    marginLeft: "10px",
    margin: `${theme.spacing.unit}px 0`
  }
});

class SelectedListItem extends React.Component {
  state = {
    selectedIndex: 1,
    offset: 0,
    title: "General Knowledge Quiz",
    qna: [
      {
        id: "1",
        question: "Which one is correct team name in NBA?",
        options: [
          "New York Bulls",
          "Los Angeles Kings",
          "Golden State Warriros",
          "Houston Rockets"
        ],
        answer: "Houston Rockets"
      },
      {
        id: "2",
        question: "5 + 7 = ?",
        options: ["10", "11", "12", "13"],
        answer: "12"
      },
      {
        id: "3",
        question: "12 - 8 = ?",
        options: ["1", "2", "3", "4"],
        answer: "4"
      }
    ],
    answers: []
  };

  componentDidMount = () => {
    var answers = this.state.answers;
    answers = Array(this.state.qna.length).map((value, index) => {
      return "";
    });
    console.log(answers);
    this.setState({
      answers: answers
    });
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  handlePageChange = e => {
    console.log(e.target.value);
  };

  handleClick(e, offset) {
    this.setState({ offset });
  }

  handleChange = e => {
    const options = this.state.qna[this.state.offset].options;
    console.log(e.target.value);
    console.log(this.state.answers);
    //answer number
    console.log(
      options.findIndex(option => {
        return option == e.target.value;
      }),
      this.state.offset
    );
    var answer = e.target.value;
    var ansNo = options.findIndex(option => {
      return option == e.target.value;
    })
    var answers = this.state.answers.slice();
    answers[this.state.offset] = answer;
    this.setState({
      answers: answers
    },()=>{
      console.log(this.state.answers)
    })
  };

  render() {
    const { classes } = this.props;
    const questionNum = this.state.offset;
    const question = this.state.qna[this.state.offset].question;
    console.log(question);
    const options = this.state.qna[this.state.offset].options;
    console.log(options);
    var id = 0;
    const answer = this.state.answers[this.state.offset]
    console.log('offset', this.state.offset, "asnwer",  this.state.answers[this.state.offset])
    const optionList = (
      <RadioGroup
        aria-label="Gender"
        name="gender1"
        className={classes.group}
        // value='Golden State Warriros'
        value={answer}
        onChange={this.handleChange}
      >
        {options.map((op, opNum) => (
          <FormControlLabel
            value={op}
            id={opNum}
            control={<Radio />}
            label={op}
          />
        ))}
      </RadioGroup>
    );
    const OptionList = options.map((option, id) => (
      <span
        id={id}
        onClick={event => {
          console.log(questionNum, event.target.id);
        }}
      >
        {/* 
        <ListItem
          id={id}
          button
          selected={false}
          key={option.toString()}
          //onClick={event => this.handleListItemClick(event, 2)}
        >
          <ListItemText primary={option} />
        </ListItem> */}
      </span>
    ));
    console.log(this.state.offset);
    return (
      <div
        className={classes.root}
        style={{
          backgroundColor: "#e0e0e0",
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <Typography
          variant="caption"
          className="bounceIn"
          style={{
            textAlign: "center",
            paddingTop: "7%",
            paddingBottom: "2%",
            fontSize: "16px"
          }}
        >
          {this.state.title}
        </Typography>
        <div className={classes.outsidePaper}>
          <Paper className={classes.paper} elevation={1}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                paddingTop: "5%",
                paddingBottom: "5%"
              }}
            >
              {question}
            </Typography>
          </Paper>
        </div>
        <div
          style={{
            width: "50%",
            position: "relative",
            height: "auto",
            margin: "0 auto",
            padding: "10px"
          }}
        >
          <Paper>{optionList}</Paper>
        </div>
        <div
          style={{
            top: "10%",
            display: "inline-block",
            marginLeft: "0%",
            paddingTop: "5%"
          }}
        >
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
              limit={1}
              offset={this.state.offset}
              total={this.state.qna.length}
              onClick={(e, offset) => this.handleClick(e, offset)}
            />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectedListItem);
