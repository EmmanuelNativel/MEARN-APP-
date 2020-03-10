import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (localStorage.getItem("token") === null) { // On test si un utilisateur est connecté
          return <Redirect to="/login" />;
        } else {
          return <Component {...routeProps} />;
        }
      }}
    />
  );
}
export default PrivateRoute;
