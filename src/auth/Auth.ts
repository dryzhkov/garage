import * as auth0 from "auth0-js";

export default class Auth {
  private history;
  private auth0: auth0.WebAuth;

  constructor(history) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      redirectUri: process.env.AUTH0_REDIRECT_URL,
      audience: process.env.AUTH0_AUDIENCE,
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
      clientID: process.env.AUTH0_CLIENT_ID,
      returnTo: process.env.AUTH0_LOGOUT_RETURN_URL
    });
  };
}

const getAccessToken = () => {
  const accessToken = window.localStorage.getItem("access_token");

  if (!accessToken) {
    return "";
  }
  return accessToken;
};

export { getAccessToken };
