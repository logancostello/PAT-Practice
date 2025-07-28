import { VStack, RadioGroup } from "@chakra-ui/react"

type AnswerSectionProps = {
  answers: string[],
  selectedAnswer: string|null
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string | null>>
  correctAnswer: string,
  hasSubmitted: boolean
};

export function AnswerSection({ answers, selectedAnswer, setSelectedAnswer, correctAnswer, hasSubmitted }: AnswerSectionProps) {

  return (
    <RadioGroup.Root value={selectedAnswer} onValueChange={(e) => setSelectedAnswer(e.value)}>
      <VStack gap="6" alignItems="flex-start">
        {answers.map((answer, index) => {

          var bg = undefined;
          if (hasSubmitted) {
            if (answer === correctAnswer) {
              bg = "green.200";
            } else if (answer === selectedAnswer) {
              bg = "red.200";
            }
          }
          return (
            <RadioGroup.Item key={answer} value={answer} bg={bg} disabled={hasSubmitted}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{String.fromCharCode(65 + index)}. {answer}</RadioGroup.ItemText>
            </RadioGroup.Item>
          );
        })}
      </VStack>
    </RadioGroup.Root>
  );
}