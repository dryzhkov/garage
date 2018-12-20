import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { Provider } from "mobx-react";
import DevTools from "mobx-react-devtools";
import GarageModel from "../models/GarageModel";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Garage } from "./Garage";
import { Callback } from "./Callback";
import Auth from "../auth/Auth";
import Login from "./Login";

export class App extends React.Component<{}, {}> {
  private store: GarageModel;
  private auth: Auth;
  constructor(props) {
    super(props);

    this.auth = new Auth(props.history);
    this.store = new GarageModel();
    this.store.fetchVehicles();
    // pull in office ui fabric icons
    initializeIcons();
    // playing around in the console
    (window as any).store = this.store;
  }

  render() {
    return (
      <Provider store={this.store}>
        <Fabric>
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
          <DevTools />
        </Fabric>
      </Provider>
    );
  }
}
