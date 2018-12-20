import * as auth0 from "auth0-js";

export default class Auth {
  private history;
  private auth0: auth0.WebAuth;

  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: "dimaryz-dev.auth0.com", // process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: "W4dEZiCY6QVgEy8vx1Gy9WGTeKB48b2p", // process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: "http://localhost:3002/callback", // process.env.REACT_APP_AUTH0_REDIRECT_URL,
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.idToken && (authResult as any).accessToken) {
        const expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        window.localStorage.setItem("id_token", authResult.idToken);
        window.localStorage.setItem(
          "access_token",
          (authResult as any).accessToken
        );

        window.localStorage.setItem("expires_at", expiresAt);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. See console for more details.`);
        console.log(err);
      }
    });
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(window.localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    window.localStorage.removeItem("id_token");
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("expires_at");
    this.auth0.logout({
      clientID: "W4dEZiCY6QVgEy8vx1Gy9WGTeKB48b2p",
      returnTo: "http://localhost:3002"
    });
  };
}
