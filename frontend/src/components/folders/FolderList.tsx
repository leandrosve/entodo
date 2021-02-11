import { Divider, Flex, Heading, List, Stack, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Api from "../../api/api";
import Folder from "../../types/Folder";
import Alert from "../util/Alert";
import FolderForm from "./FolderForm";
import FolderListItem from "./FolderListItem";
const FolderList = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const handleAddFolder = useCallback(
    (folder: Folder) => {
      setFolders((prev) => {
        const next = [...prev, folder];
        return next;
      });
      setSuccess("Folder added!");
    },
    [setFolders, setSuccess]
  );

  const handleRemoveFolder = useCallback(
    (folderId: number, error?: string) => {
      if (error) {
        setError(error);
        return;
      }
      setFolders((prev) => {
        const next = [...prev].filter((f) => f.id !== folderId);
        return next;
      });
      setSuccess("Folder deleted!");
    },
    [setFolders, setError, setSuccess]
  );

  useEffect(() => {
    Api.get<Folder[]>("/folders")
      .then((res) => setFolders(res.data))
      .catch((err) => setError(err.message));
  }, [setFolders, setError]);

  return (
    <Flex direction="column">
      <Heading width="100%" textAlign="left">     
        Folders
      </Heading>
      {error && (
        <Alert status="error" handleClose={() => setError(undefined)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert status="success" handleClose={() => setSuccess(undefined)}>
          {success}
        </Alert>
      )}
      {folders.length == 0 && !error && (
        <Text fontSize="xl">
          You don't have any folder yet, start creating one!
        </Text>
      )}
      <List maxH="70vh" overflowY="scroll">
        {folders.map((folder: Folder) => (
          <FolderListItem
            folder={folder}
            handleRemoveFolder={handleRemoveFolder}
          />
        ))}
      </List>
      <Divider />
      <FolderForm handleAddFolder={handleAddFolder} />
    </Flex>
  );
};

export default FolderList;
