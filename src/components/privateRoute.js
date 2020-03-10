import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isLogged, ...rest }) {
  return (
    <Route
      {...rest}
      render={routeProps => {
        // On test si un utilisateur est connecté
        if (isLogged) {
          return <Component {...routeProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}
export default PrivateRoute;
