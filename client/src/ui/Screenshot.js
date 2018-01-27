import React from "react";
import api from "../api";

export default class Screenshot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cacheBreaker: Date.now()
    };

    this.refreshScreenshot = this.refreshScreenshot.bind(this);
    this.sendClickCommand = this.sendClickCommand.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  componentDidMount() {
    api.on("SCREENSHOT_UPLOADED", this.refreshScreenshot);
  }

  refreshScreenshot() {
    this.setState({ cacheBreaker: Date.now() });
  }

  sendClickCommand(event) {
    console.log("event.ctrlKey", event.ctrlKey);
    console.log("event.altKey", event.altKey);

    const x = event.pageX - this.imageElement.x;
    const y = event.pageY - this.imageElement.y;

    const command = event.ctrlKey
      ? "SCROLL_DOWN"
      : event.altKey ? "SCROLL_UP" : "CLICK_COORDINATES";

    api.emit(command, { x, y });
  }

  onKeyPressed(e) {
    console.log(e.ctrlKey);
  }

  render() {
    return (
      <div onKeyDown={this.onKeyPressed}>
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
