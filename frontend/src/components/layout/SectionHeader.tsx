import React, { FunctionComponent } from "react";
import {
  Divider,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";


interface Props {
  title: string;
  actions: React.ReactChild;
}
const SectionHeader: FunctionComponent<Props> = ({ title, actions }) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading isTruncated noOfLines={3}>
        {title}
      </Heading>

      <Flex grow={1} overflow="hidden">
        <Divider margin="5px 20px" />
      </Flex>
      <Stack direction={{ base: "column", md: "row" }}>{actions}</Stack>
    </Flex>
  );
};

export default SectionHeader;
