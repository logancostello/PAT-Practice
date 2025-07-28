type AngleQuestionDetails = {
    angles: number[],
    answers: string[],
    correctAnswer: string
}

// Generates 4 angles and 4 answers (1 correct, 3 incorrect)
export function generateAngleQuestion(): AngleQuestionDetails {

    const angle = Math.floor(Math.random() * (160 - 20 + 1)) + 20; // 20-160
    const offset = Math.floor(Math.random() * (6 - 2 + 1)) + 2; // 2-6

    // Select four angles, including the given angle
    const potentialAngles: number[] = [
        angle - 3 * offset,
        angle - 2 * offset,
        angle - offset,
        angle,
        angle + offset,
        angle + 2 * offset,
        angle + 3 * offset,
    ];

    const firstAngleIndex = Math.floor(Math.random() * 4);
    const fourAngles = potentialAngles.slice(firstAngleIndex, firstAngleIndex + 4);
    const originalOrder = [...fourAngles];

    // Randomize the order of the angles
    const angle1 = popRandomElement(fourAngles);
    const angle2 = popRandomElement(fourAngles);
    const angle3 = popRandomElement(fourAngles);
    const angle4 = popRandomElement(fourAngles);
    const shuffledFourAngles = [angle1, angle2, angle3, angle4];

    // Find the correct answer
    const correctRanking = originalOrder.map(a => 
        shuffledFourAngles.findIndex(shuffledAngle => shuffledAngle === a) + 1
    );
    const correctAnswer: string = correctRanking.join('-'); 

    // Generate 3 wrong answers
    const oneOffWrongAnswers = [
        [correctRanking[1], correctRanking[0], correctRanking[2], correctRanking[3]],
        [correctRanking[0], correctRanking[2], correctRanking[1], correctRanking[3]],
        [correctRanking[0], correctRanking[1], correctRanking[3], correctRanking[2]],
    ]

    const twoOffWrongAnswers = [
        [correctRanking[1], correctRanking[2], correctRanking[0], correctRanking[3]],
        [correctRanking[0], correctRanking[2], correctRanking[3], correctRanking[1]],
        [correctRanking[0], correctRanking[3], correctRanking[1], correctRanking[2]],
        [correctRanking[2], correctRanking[0], correctRanking[1], correctRanking[3]],
    ];

    // Shuffle the answers in a random order
    const answers = [
        correctAnswer, 
        selectWrongAnswer(oneOffWrongAnswers, twoOffWrongAnswers),
        selectWrongAnswer(oneOffWrongAnswers, twoOffWrongAnswers),
        selectWrongAnswer(oneOffWrongAnswers, twoOffWrongAnswers),
    ];

    const answer1 = popRandomElement(answers);
    const answer2 = popRandomElement(answers);
    const answer3 = popRandomElement(answers);
    const answer4 = popRandomElement(answers);
    const shuffledAnswers = [answer1, answer2, answer3, answer4];

    return {angles: shuffledFourAngles, answers: shuffledAnswers, correctAnswer: correctAnswer};
}

function selectWrongAnswer(oneOffWrongAnswers: number[][], twoOffWrongAnswers: number[][]): string {
    const rand = Math.random();
    if (rand < 0.7) { // 70% chance for first 3 options
        return popRandomElement(oneOffWrongAnswers).join('-');
    } else { // 30% chance for remaining options
        return popRandomElement(twoOffWrongAnswers).join('-');
    }

}   

// Helper for essentially a random shuffle
function popRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex, 1)[0];
}