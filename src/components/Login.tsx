import * as React from "react";
import Auth from "../auth/Auth";
import * as H from "history";
import { Redirect } from "react-router";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

export interface LoginProps {
  history: H.History;
  auth: Auth;
}

export default class Login extends React.Component<LoginProps, any> {
  public render() {
    const { isAuthenticated, login } = this.props.auth;

    return (
      <div>
        {!isAuthenticated() ? (
          <PrimaryButton onClick={login}>Login</PrimaryButton>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}
