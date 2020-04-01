import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./components/home";
import NotFound from "./components/notFound";
import Background from "./img/1373.jpg";

class App extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(" + Background + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        {/* <NavBar /> */}
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
