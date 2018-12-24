import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Garage } from "./Garage";
import { Callback } from "./Callback";
import Auth from "../auth/Auth";
import Login from "./Login";
import Nav from "./Nav";

export class App extends React.Component<{}, {}> {
  private auth: Auth;
  constructor(props) {
    super(props);
    this.auth = new Auth(props.history);
    // pull in office ui fabric icons
    initializeIcons();
  }

  render() {
    console.log(process.env.AUTH0_DOMAIN);
    console.log(process.env.AUTH0_CLIENT_ID);
    console.log(process.env.AUTH0_DOMAIN);
    return (
      <Fabric>
        <Nav auth={this.auth} />
        <Route
          path="/"
          exact
          render={props => <Garage auth={this.auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => <Callback auth={this.auth} {...props} />}
        />
        <Route
          path="/login"
          render={props => <Login auth={this.auth} {...props} />}
        />
      </Fabric>
    );
  }
}
