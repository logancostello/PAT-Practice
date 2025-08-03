import { VStack, RadioGroup } from "@chakra-ui/react"
import { useState, useEffect, type MouseEvent } from "react"

type AnswerSectionProps = {
  answers: string[],
  selectedAnswer: string|null
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string | null>>
  correctAnswer: string,
  hasSubmitted: boolean
};

export function AnswerSection({ answers, selectedAnswer, setSelectedAnswer, correctAnswer, hasSubmitted }: AnswerSectionProps) {
  const [answerStates, setAnswerStates] = useState(() => answers.map((answer) => ({"answer": answer, "crossedOut": false})));

  useEffect(() => {
    setAnswerStates(answers.map((answer) => ({answer: answer, crossedOut: false})));
  }, [answers]);

  const handleRightClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, index: number) => {
    e.preventDefault();
    if (hasSubmitted) return;

    setAnswerStates(prev => 
      prev.map((item, i) => 
        i === index 
          ? { ...item, crossedOut: !item.crossedOut }
          : item
      )
    );

    // Clear selection if the selected answer is being crossed out
    if (answerStates[index].answer === selectedAnswer && !answerStates[index].crossedOut) {
      setSelectedAnswer(null);
    }
  }

  return (
    <RadioGroup.Root value={selectedAnswer} onValueChange={(e) => setSelectedAnswer(e.value)}>
      <VStack gap="6" alignItems="flex-start">
        {answerStates.map((a, index) => {

          var bg = undefined;
          if (hasSubmitted) {
            if (a.answer === correctAnswer) {
              bg = "green.200";
            } else if (a.answer === selectedAnswer) {
              bg = "red.200";
            }
          }
          return (
            <RadioGroup.Item 
              key={a.answer} 
              value={a.answer} 
              bg={bg} 
              disabled={hasSubmitted || a.crossedOut} 
              onContextMenu={(e) => handleRightClick(e, index)}
              textDecoration={!hasSubmitted && a.crossedOut ? "line-through" : "none"}
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{String.fromCharCode(65 + index)}. {a.answer}</RadioGroup.ItemText>
            </RadioGroup.Item>
          );
        })}
      </VStack>
    </RadioGroup.Root>
  );
}