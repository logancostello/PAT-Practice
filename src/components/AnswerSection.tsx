import { VStack, RadioGroup, Box } from "@chakra-ui/react"
import { useState } from "react"

type AnswerSectionProps = {
  correctAnswer: string;
  alternative1: string;
  alternative2: string;
  alternative3: string;
};

export function AnswerSection({correctAnswer, alternative1, alternative2, alternative3 }: AnswerSectionProps) {

  const items = [
    { value: "A", title: "A", answer: correctAnswer },
    { value: "B", title: "B", answer: alternative1 },
    { value: "C", title: "C", answer: alternative2 },
    { value: "D", title: "D", answer: alternative3 },
  ];

  const [value, setValue] = useState<string | null>(null)

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" bg="gray.50">
      <RadioGroup.Root value={value} onValueChange={(e) => setValue(e.value)}>
        <VStack gap="6" alignItems="flex-start">
          {items.map((item) => (
            <RadioGroup.Item key={item.value} value={item.value}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{item.title}. {item.answer}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </VStack>
      </RadioGroup.Root>
    </Box>
  );
}