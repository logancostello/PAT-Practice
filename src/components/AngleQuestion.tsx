import { FourAngledLines } from "./FourAngledLines"
import { AnswerSection } from "./AnswerSection"

export function AngleQuestion() {
    
    return (
        <div>
            <FourAngledLines trueAngle={45} angleOffset={5}/>
            <AnswerSection
            correctAnswer="right"
            alternative1="wrong1"
            alternative2="wrong2"
            alternative3="wrong3"
            />
        </div>
    )
}