import React from "react";
import ReactDOM from "react-dom";

import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import InputField from "./components/InputField";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import QuizPage from "./components/QuizPage";
import CreateQuiz from './components/CreateQuiz';
import QuizResults from './components/QuizResults';
import Profile from './components/Profile';
import CoursePage from './components/CoursePage';
import "./styles.css";
import Helmet from "react-helmet";
import { BrowserRouter, Route } from "react-router-dom";
import "./components/LandingPage.css";
class App extends React.Component {
  componentDidMount() {
    const root = document.getElementById("root");
    root.classList.add("bg");
  }
  render() {
    return (
      <div className="App">
        <Helmet bodyAttributes={{ style: "background-color : #fff" }} />
        <BrowserRouter>
          <div className="Navbar">
            {/* <Navbar /> */}
          </div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/quiz" component={QuizPage} />
          <Route exact path="/createquiz" component={CreateQuiz} />
          <Route path="/quizresults/:quizid" component={QuizResults} />
          <Route exact path="/profile/" component={Profile} />
          <Route path="/courses/:cid" component={CoursePage} />
          {/* <LandingPage /> */}
        </BrowserRouter>

        {/* <Drawer /> */}
        {/* <Signup /> */}

        {/* <InputField /> */}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
