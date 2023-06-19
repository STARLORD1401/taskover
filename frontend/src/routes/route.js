import React from "react";
import { Route, Navigate } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthProtected !== null) {
        return (
          <Navigate
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

export default AppRoute;
