import React from "react";

const serverUrl = "https://ai-luminance.herokuapp.com/";

class App extends React.Component<any, any> {
  constructor(props: Object) {
    super(props);
    this.state = {
      title: "Start",
      r: undefined,
      g: undefined,
      b: undefined,
      isLight: true,
    };
    this.getLuminance = this.getLuminance.bind(this);
  }

  async getLuminance() {
    await fetch(serverUrl)
      .then((res) => res.json())
      .then((json) => {
        const { r, g, b, likely } = json;
        this.setState({
          title: likely,
          r: r,
          g: g,
          b: b,
          isLight: likely === "Light",
        });
      })
      .catch(() => {
        this.setState({
          title: "Server Down 🛠",
          r: 176,
          g: 0,
          b: 32,
          isLight: false,
        });
        console.log("Failed to fetch colors.");
      });
  }

  render() {
    const { title, r, g, b, isLight } = this.state;
    return (
      <div
        className="start"
        onClick={this.getLuminance}
        style={{ background: `rgb(${r},${g},${b})` }}
      >
        <p
          className="unselectable"
          style={{ color: `${isLight ? "#121212" : "#FFFFFF"}` }}
        >
          {title}
        </p>
      </div>
    );
  }
}

export default App;
