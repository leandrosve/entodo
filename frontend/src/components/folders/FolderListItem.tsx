import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import FolderIcon from "@ant-design/icons/FolderFilled";

import DeleteIcon from "@ant-design/icons/DeleteOutlined";

import ViewIcon from "@ant-design/icons/EyeOutlined";
import Folder from "../../types/Folder";
import Api from "../../api/api";

interface FolderListItemProps {
  folder: Folder;
  handleRemoveFolder: (id: number, error?: string) => void;
}

const FolderListItem: FC<FolderListItemProps> = ({
  folder,
  handleRemoveFolder,
}) => {
  const removeFolder = useCallback(() => {
    Api.delete(`/folders/${folder.id}`)
      .then(() => handleRemoveFolder(folder.id))
      .catch((err) => handleRemoveFolder(err.message));
  }, [folder]);

  return (
    <Stack
      flexDir={{ md: "row", base: "column" }}
      spacing="5"
      align="center"
      justifyContent="space-between"
    >
      <FolderIcon style={{ fontSize: "75px" }} />
      <Stack spacing={0}>
        <Heading as="h4" size="md">
          {folder.title}
        </Heading>
        <Text>{folder.description}</Text>
      </Stack>
      <Stack flexDir={{ md: "row", base: "column" }} align="center">
        <Button m="5px" colorScheme="brand" leftIcon={<ViewIcon />}>
          View Items
        </Button>
        <Button m="5px" variant="outline" leftIcon={<DeleteIcon />} onClick={removeFolder}>
          Remove
        </Button>
      </Stack>
    </Stack>
  );
};

export default FolderListItem;
