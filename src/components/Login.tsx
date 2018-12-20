import * as React from "react";
import Auth from "../auth/Auth";
import * as H from "history";
import { Redirect } from "react-router";

export interface LoginProps {
  history: H.History;
  auth: Auth;
}

export default class Login extends React.Component<LoginProps, any> {
  public render() {
    const { isAuthenticated } = this.props.auth;

    return <div>{isAuthenticated() ? <Redirect to="/" /> : ""}</div>;
  }
}
