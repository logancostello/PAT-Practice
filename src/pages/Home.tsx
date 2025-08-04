import { Stack } from "@chakra-ui/react";
import { QuestionPreview } from "../components/QuestionPreview";

export function Home() {
  const questionOptions = [
    {
      title: "Angle Ranking",
      description: "Rank angles from smallest to largest",
      path: "../question/angle"
    },
    {
      title: "Keyholes",
      description: "Coming soon",
      path: "."
    },
    {
      title: "Hole Punches",
      description: "Coming soon",
      path: "."
    },
    {
      title: "Cube Counting",
      description: "Coming soon",
      path: "."
    },
    {
      title: "Pattern Folding",
      description: "Coming soon",
      path: "."
    },
    {
      title: "Top-Front-End",
      description: "Coming soon",
      path: "."
    },
    {
      title: "View Recognition",
      description: "Coming soon",
      path: "."
    },
  ];

  return (
    <Stack gap={4}>
      {questionOptions.map((q, index) => (
        <QuestionPreview
          key={index}
          title={q.title}
          description={q.description}
          path={q.path}
        />
      ))}
    </Stack>
  );
}
