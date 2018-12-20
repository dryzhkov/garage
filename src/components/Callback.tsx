import * as React from 'react';
import Auth from '../auth/Auth';

interface CallbackProps { 
  location?: any;
  auth: Auth;
}

export class Callback extends React.Component<CallbackProps, {}> {
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error('invalid callback URL');
    }
  }
  render() {
    return <h1>Loading...</h1>;
  }
}