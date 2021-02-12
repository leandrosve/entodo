import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import FolderIcon from "@ant-design/icons/FolderOpenFilled";
import DeleteIcon from "@ant-design/icons/DeleteOutlined";
import ViewIcon from "@ant-design/icons/EyeOutlined";
import Folder from "../../types/Folder";
import Api from "../../api/api";
import { Link } from "react-router-dom";
import useColorFromId from "../hooks/useColorFromId";

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

  const color = useColorFromId(folder.id);

  return (
    <Stack
      flexDir={{ md: "row", base: "column" }}
      spacing="5"
      align="center"
      justifyContent="space-between"
    >
      <Stack flexDir={{ md: "row", base: "column" }}>
        <FolderIcon style={{ fontSize: "75px", color }} />
        <Stack spacing={0}>
          <Heading
            as="h4"
            size="md"
            maxW="400px"
            wordBreak="break-all"
            noOfLines={3}
          >
            {folder.title}
          </Heading>
          <Text>{folder.description}</Text>
        </Stack>
      </Stack>
      <Stack flexDir={{ md: "row", base: "column" }} align="center">
        <Link to={`/folders/${folder.id}`}>
          <Button m="5px" colorScheme="brand" leftIcon={<ViewIcon />}>
            View Items
          </Button>
        </Link>
        <Button
          m="5px"
          variant="outline"
          leftIcon={<DeleteIcon />}
          onClick={removeFolder}
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  );
};

export default FolderListItem;
