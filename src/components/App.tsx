import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Garage } from './Garage';
import Auth from '../auth/Auth';
import Login from './Login';
import Nav from './Nav';

export class App extends React.Component<{}, {}> {
  private auth: Auth;
  constructor(props) {
    super(props);
    this.auth = new Auth(props.history);
    // pull in office ui fabric icons
    initializeIcons();
  }

  render() {
    return (
      <Fabric>
        <Nav auth={this.auth} />
        <Route
          path="/"
          exact
          render={(props) => <Garage auth={this.auth} {...props} />}
        />
        <Route
          path="/login"
          render={(props) => <Login auth={this.auth} {...props} />}
        />
      </Fabric>
    );
  }
}
