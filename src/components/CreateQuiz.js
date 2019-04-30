import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import update from "react-addons-update"; // ES6

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "50%"
  },
  title: {
    paddingTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "25%"
  },
  textFieldAnswer: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "30%"
  },
  button: { margin: theme.spacing.unit }
});

class CreateQuiz extends Component {
  state = {
    title: "",
    quiz: [
      {
        id: 0,
        question: "Something",
        options: ["some", "thing", "to"],
        answer: ""
      },

      {
        id: 1,
        question: "Something2",
        options: ["some2", "thing2", "to2"],
        answer: ""
      }
    ]
  };

  componentDidMount() {
    var pagetitle = document.getElementById('pagetitle');
    pagetitle.innerHTML = 'Create Quiz'
  }

  quiz = () => {
    let questions = [];
    for (let i = 0; i < this.state.quiz.length; i++) {
      let answers = [];
      for (let j = 0; j < this.state.quiz[i].options.length; j++) {
        console.log(this.state.quiz[i].options[j]);
      }
    }
  };

  handleAddQuestion = e => {
    let questions = this.state.quiz;
    let totalQues = this.state.quiz.length;
    console.log(totalQues);
    let sampleQuestion = {
      id: totalQues, // change id when adding question
      question: "SomeQuestion",
      options: ["A", "B"],
      answer: ""
    };
    this.setState(prevState => ({
      quiz: [...prevState.quiz, sampleQuestion]
    }));
  };

  handleAddOption = id => {
    console.log(
      id
    ); /* 
    var options = [...this.state.quiz[id].options, 'Another Option'];
    // options.push("Another Option");
    console.log(options);
    this.state.quiz[id].options = options;
    this.forceUpdate(); */
    let quiz = this.state.quiz.slice();
    quiz[id].options.push("Another Option");
    this.setState({
      quiz: quiz
    });
  };

  handleAnswerChange = e => {
    console.log(e.target.value, e.target, e.target.id);
    let quiz = this.state.quiz.slice();
    quiz[e.target.name].answer = e.target.value;
    this.setState({
      quiz: quiz
    });
  };

  handleQuestionChange = e => {
    console.log(e.target.value, e.target.id);
    let quiz = this.state.quiz.slice();
    quiz[e.target.id].question = e.target.value;
    this.setState({
      quiz: quiz
    });
  };

  handleOptionChange = (questionId, optionId, e) => {
    console.log(questionId, optionId, e.target.value);
    let quiz = this.state.quiz.slice();
    quiz[questionId].options[optionId] = e.target.value;
    this.setState(
      {
        quiz: quiz
      },
      () => {
        console.log(this.state.quiz);
      }
    );
  };

  handleTitleChange = e => {
    this.setState(
      {
        title: e.target.value
      },
      () => {
        console.log(this.state.title);
      }
    );
  };
  render() {
    const { classes } = this.props;
    let num = 0;
    const data = this.state.quiz;
    const question = data.map((dataElement, num) => (
      <div>
        <TextField
          id={num}
          onChange={this.handleQuestionChange}
          label={["Question", num + 1].join(" ")}
          multiline
          defaultValue={dataElement.question}
          rows="2"
          placeholder="What's an orange?"
          className={classes.textField}
          margin="normal"
        />
        {dataElement.options.map((op, opNum) => (
          <div>
            <TextField
              id={opNum}
              onChange={e => {
                this.handleOptionChange(num, opNum, e);
              }}
              label={["Option", opNum + 1].join(" ")}
              defaultValue={op}
              placeholder="What's an orange?"
              className={classes.textFieldAnswer}
              margin="normal"
            />
          </div>
        ))}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="answer">Answer</InputLabel>
          <Select
            id={num}
            name={num}
            value={dataElement.answer}
            onChange={this.handleAnswerChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dataElement.options.map((op, opNum) => (
              <MenuItem value={op} className={classes.textFieldAnswer}>
                {op}
              </MenuItem>
            ))}
            {/* 
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <br />
        <Button
          id={dataElement.id}
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => this.handleAddOption(dataElement.id)}
        >
          Add Option
        </Button>
      </div>
    ));

    {
      /* 
        <li id={num}>
        {dataElement.question}
        <li>{dataElement.options}</li>
        </li> */
    }
    console.log(data);
    return (
      <div style={{
        backgroundColor: "#e0e0e0",
        position: 'absolute',
        width: "100.5%",
        marginTop: '-15px',
        marginLeft: '-15px',
      }}>
        <TextField
          id="title"
          onChange={this.handleTitleChange}
          label="Quiz Title"
          placeholder="General Knowledge Quiz - 1"
          className={classes.title}
          margin="normal"
        />
        {question}
        {/* {this.quiz} */}
        {/* <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows="2"
          placeholder="What's an orange?"
          className={classes.textField}
          margin="normal"
        /> */}
        <br />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.handleAddQuestion}
        >
          Add Question
        </Button>
      </div>
    );
  }
}

CreateQuiz.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateQuiz);
