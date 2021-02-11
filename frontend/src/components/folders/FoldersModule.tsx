import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import FolderDetail from "./FolderDetail";
import FolderList from "./FolderList";

const FoldersModule = () => {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`/folders`}>
        <Box    margin="auto" >
        <FolderList />
        </Box>
      </Route>
      <Route path={`${match.path}/:folderId`}>
        <FolderDetail/>
      </Route>
    </Switch>
  );
};

export default FoldersModule;
