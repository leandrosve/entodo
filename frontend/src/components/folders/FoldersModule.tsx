import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import FolderDetail from "./FolderDetail";
import FolderList from "./FolderList";

const FoldersModule = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`/folders`}>
        <FolderList />
      </Route>
      <Route path={`${match.path}/:folderId`}>
        <FolderDetail />
      </Route>
    </Switch>
  );
};

export default FoldersModule;
