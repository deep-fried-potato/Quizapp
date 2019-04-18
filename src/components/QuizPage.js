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
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class SelectedListItem extends React.Component {
  state = {
    selectedIndex: 1,
    offset: 0,
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
    ]
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

  render() {
    const { classes } = this.props;
    const question = this.state.qna[this.state.offset].question;
    console.log(question);
    const options = this.state.qna[this.state.offset].options;
    console.log(options);
    const OptionList = options.map(option => (
      <ListItem
        button
        selected={false}
        key={option.toString()}
        //onClick={event => this.handleListItemClick(event, 2)}
      >
        <ListItemText primary={option} />
      </ListItem>
    ));
    console.log(this.state.offset);
    return (
      <div className={classes.root}>
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
        <List
          component="nav"
          style={{
            textAlign: "center"
          }}
        >
          {OptionList}
          {/* <ListItem
            button
            selected={this.state.selectedIndex === 3}
            onClick={event => this.handleListItemClick(event, 3)}
          >
            <ListItemText primary="Spam" />
          </ListItem */}
        </List>{" "}
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
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectedListItem);
