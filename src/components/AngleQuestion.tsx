import { FourAngledLines } from "./FourAngledLines"
import { AnswerSection } from "./AnswerSection"
import { Box, Stack, Separator, Button, Flex, Text, Heading } from "@chakra-ui/react"
import { generateAngleQuestion } from "../AngleQuestionGenerator"
import { useState, useEffect } from "react"


export function AngleQuestion() {
    
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [answerDetails, setAnswerDetails] = useState(() => generateAngleQuestion()); 
    const [numCorrect, setNumCorrect] = useState(0);
    const [numAttempted, setNumAttemped] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [totalTime, setTotalTime] = useState(0);

    // Reset start time when a new question is generated
    useEffect(() => {
        setStartTime(Date.now());
    }, [answerDetails]);

    const handleSubmit = () => {
        const timeSpent = Date.now() - startTime;
        setTotalTime(totalTime + timeSpent);
        
        if (selectedAnswer === answerDetails.correctAnswer) {
            setNumCorrect(numCorrect + 1);
        };
        setNumAttemped(numAttempted + 1);
        setHasSubmitted(true);
   };

   const handleNext = () => {
        setHasSubmitted(false);
        setSelectedAnswer(null);
        setAnswerDetails(generateAngleQuestion());
   };

   const averageTimeSeconds = numAttempted > 0 ? (totalTime / numAttempted / 1000).toFixed(1) : 0;

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
            <Stack>
                <Heading size="3xl" fontWeight="bold" color={"gray.700"}>
                    Angle Ranking
                </Heading>
                <FourAngledLines angles={answerDetails.angles} hasSubmitted={hasSubmitted}/>
                <Separator />
                <Flex justify="flex-start" gap={2} pb={2}>
                    <Text fontWeight="semibold" textStyle="md" color={"gray.700"}>
                        Rank the angles from smallest to largest
                    </Text>
                </Flex>
                <AnswerSection 
                answers={answerDetails.answers} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
                correctAnswer={answerDetails.correctAnswer}
                hasSubmitted={hasSubmitted}
                />
                <Separator/>
                <Stack direction="row" justify="space-between" align="center">
                    <Stack align="flex-start" visibility={numAttempted > 0 ? "true" : "hidden"}>
                        <Text fontWeight="semibold" textStyle="md" color={"gray.700"} >
                            Accuracy: {(numCorrect/numAttempted * 100).toFixed()}% ({numCorrect}/{numAttempted})
                        </Text> 
                        <Text fontWeight="semibold" textStyle="md" color={"gray.700"}>
                            Avg time: {averageTimeSeconds} seconds
                        </Text>
                    </Stack>
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
                </Stack>
            </Stack>
        </Box>
    )
}