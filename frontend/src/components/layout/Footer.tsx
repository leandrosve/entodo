import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Flex width="100%" position="static" justifyContent ="space-between" mt="10px" boxShadow="inner"  padding="20px" bottom="0">
        <Text size="xl">
          <strong>Entodo</strong> demo To-Do list App
        </Text>
        <Text size="xl" textAlign="right">
          Leandro Svetlich <strong>2021</strong>
        </Text>
      </Flex>
    )
}

export default Footer
