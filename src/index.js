import React from "react";
import ReactDOM from "react-dom";

import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import InputField from "./components/InputField";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import "./styles.css";
import Helmet from "react-helmet";
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Helmet bodyAttributes={{ style: "background-color : #fff" }} />
        <BrowserRouter>
          <div className="Navbar">
            <Navbar />
          </div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
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
