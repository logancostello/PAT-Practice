import { FourAngledLines } from "./FourAngledLines"
import { AnswerSection } from "./AnswerSection"
import { Box, Stack, StackSeparator, Button, Flex } from "@chakra-ui/react"
import { generateAngleQuestion } from "../AngleQuestionGenerator"
import { useState } from "react"


export function AngleQuestion() {
    
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [answerDetails, setAnswerDetails] = useState(() => generateAngleQuestion());    

    const handleSubmit = () => {
       setHasSubmitted(true);
   };

   const handleNext = () => {
        setHasSubmitted(false);
        setSelectedAnswer(null);
        setAnswerDetails(generateAngleQuestion());
   };

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
            <Stack separator={<StackSeparator />}>
                <FourAngledLines angles={answerDetails.angles} hasSubmitted={hasSubmitted}/>
                <AnswerSection 
                answers={answerDetails.answers} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
                correctAnswer={answerDetails.correctAnswer}
                hasSubmitted={hasSubmitted}
                />
                 <Flex justify="flex-end" gap={2}>
                    {!hasSubmitted ? 
                        <Button 
                            onClick={handleSubmit}
                            disabled={!selectedAnswer}
                            bg="gray.800"
                            color="white"
                            _hover={{bg: "gray.900"}}
                            fontWeight="bold" 
                            fontSize="md"
                            flex="1"
                            maxWidth={"100px"}

                        >
                            Submit
                        </Button>
                        :
                        <Button 
                            onClick={handleNext}
                            bg="gray.800"
                            color="white"
                            _hover={{bg: "gray.900"}}
                            fontWeight="bold" 
                            fontSize="md"
                            flex="1"
                            maxWidth={"100px"}
                        >
                            Next
                        </Button>
                    }
                </Flex>
            </Stack>
        </Box>
    )
}