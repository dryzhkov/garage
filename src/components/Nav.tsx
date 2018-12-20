import * as React from "react";
import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";
import styles from "../styles.css.js";
import Auth from "../auth/Auth.js";

export interface Navrops {
  auth: Auth;
}

export default class Nav extends React.Component<Navrops, any> {
  public render() {
    const { isAuthenticated, logout, login } = this.props.auth;
    return (
      <nav>
        <div style={styles.header}>
          <h1>My Garage</h1>
          {isAuthenticated() ? (
            <DefaultButton onClick={logout} style={styles.floatRight}>
              Log out
            </DefaultButton>
          ) : (
            <PrimaryButton onClick={login} style={styles.floatRight}>
              Login
            </PrimaryButton>
          )}
        </div>
        <div style={styles.headerBorder} />
      </nav>
    );
  }
}
