import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Screenshot from "./ui/Screenshot";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import api from "./api";

class App extends Component {
  componentDidMount() {
    api.on("test", () => console.log("message test arrived"));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <Screenshot />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
