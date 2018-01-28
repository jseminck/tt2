import React from "react";
import api from "../api";
import FlatButton from "material-ui/FlatButton";

export default class Screenshot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickMode: "SINGLE_CLICK",
      cacheBreaker: Date.now()
    };

    this.refreshScreenshot = this.refreshScreenshot.bind(this);
    this.sendClickCommand = this.sendClickCommand.bind(this);
  }

  componentDidMount() {
    api.on("SCREENSHOT_UPLOADED", this.refreshScreenshot);
  }

  refreshScreenshot() {
    this.setState({ cacheBreaker: Date.now() });
  }

  sendClickCommand(event) {
    console.log("event", event.nativeEvent);

    const x = event.pageX - this.imageElement.x;
    const y = event.pageY - this.imageElement.y;

    const command =
      this.state.clickMode === "SCROLL_DOWN"
        ? "SCROLL_DOWN"
        : this.state.clickMode === "SCROLL_UP"
          ? "SCROLL_UP"
          : this.state.clickMode === "MULTI_CLICK"
            ? "CLICK_COORDINATES_MULTIPLE"
            : "CLICK_COORDINATES";

    api.emit(command, { x, y });
  }

  render() {
    return (
      <div>
        <div>
          <FlatButton
            onClick={() => this.setState({ clickMode: "SINGLE_CLICK" })}
            primary={this.state.clickMode === "SINGLE_CLICK"}
            label="Single Click"
          />
          <FlatButton
            onClick={() => this.setState({ clickMode: "MULTI_CLICK" })}
            primary={this.state.clickMode === "MULTI_CLICK"}
            label="Multi Click"
          />
          <FlatButton
            onClick={() => this.setState({ clickMode: "SCROLL_UP" })}
            primary={this.state.clickMode === "SCROLL_UP"}
            label="Scroll Up"
          />
          <FlatButton
            onClick={() => this.setState({ clickMode: "SCROLL_DOWN" })}
            primary={this.state.clickMode === "SCROLL_DOWN"}
            label="Scroll Down"
          />
        </div>
        <img
          ref={e => {
            this.imageElement = e;
          }}
          onClick={this.sendClickCommand}
          src={`http://188.226.164.164:12345/out.png?${Date.now()}`}
        />
      </div>
    );
  }
}
