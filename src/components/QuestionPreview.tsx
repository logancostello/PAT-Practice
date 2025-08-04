import { Card, Heading, Flex, Button, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

type QuestionPreviewProps = {
  title: string
  description: string
  path: string
}

export function QuestionPreview({ title, description, path }: QuestionPreviewProps) {
  const navigate = useNavigate()

  return (
    <Card.Root size="md" bg="gray.50">
        <Card.Header>
          <Heading size="xl" fontWeight="bold" color={"gray.700"}> {title} </Heading>
        </Card.Header>
        <Card.Body>
            <Text textStyle="md" color={"gray.700"}>
                {description} 
            </Text>
        </Card.Body>
        <Card.Footer>
            <Flex w="100%" justify="flex-end">
                <Button 
                    onClick={() => navigate(path)}
                    bg="gray.800"
                    color="white"
                    _hover={{bg: "gray.900"}}
                    fontWeight="bold" 
                    fontSize="md"
                    flex="1"
                    maxWidth={"75px"}
                >
                    Start
                </Button>
            </Flex>
        </Card.Footer>
      </Card.Root>
  )
}
