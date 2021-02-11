import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GoBackIcon from "@ant-design/icons/ArrowLeftOutlined";
import Folder from "../../types/Folder";
import Api from "../../api/api";
import ToDoListModule from "../todos/ToDoListModule";

const FolderDetail: FC = () => {
  const { folderId } = useParams<Record<string, string | undefined>>();
  const [folder, setFolder] = useState<Folder>();

  useEffect(() => {
    Api.get<Folder>(`/folders/${folderId}`).then((res) => setFolder(res.data));
  }, [setFolder, folderId]);
  return (
    <Stack align="center"     margin="auto" overflow="hidden" overflowY="scroll">
      {!!folder ? (
        <>
          <Heading textAlign="left" width="100%">
            Folders <strong>➤</strong> {folder.title}
          </Heading>
          <Text size="lg" w="100%" align="left">
            ⚫ {folder.description || "No description"}
          </Text>
          <Box padding="5px" borderLeft="5px solid black"  borderBottom="5px solid black">
          <ToDoListModule folderId={folder.id} title="Tasks"/>
          </Box>
          <Link to="/folders">
            <Button leftIcon={<GoBackIcon />}>Return to list</Button>
          </Link>
        </>
      ) : (
        <Text size="lg">Could not find the requested folder</Text>
      )}
    </Stack>
  );
};

export default FolderDetail;
