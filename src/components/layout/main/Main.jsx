import React from "react";
import { Switch } from "react-router-dom";
import { UsersList } from "../../users/users-list/UsersList";
import { User } from "../../users/user/User";
import { AuthenticatedRoute } from "../../../core/auth/AuthenticatedRoute";
import { UserEdit } from "../../users/user-edit/UserEdit";

export function Main() {
  // const style = {
  //   width: "100vw",
  //   height: "100vh",
  // };

  return (
    <div className="main-content">
      <Switch>
        <AuthenticatedRoute exact path="/users" component={UsersList} />
        <AuthenticatedRoute exact path="/users/:id" component={User} />
        <AuthenticatedRoute
          admin={true}
          exact
          path="/users/:id/edit"
          component={UserEdit}
        />
        <AuthenticatedRoute
          admin={true}
          exact
          path="/create"
          component={UserEdit}
        />
      </Switch>
    </div>
  );
}
