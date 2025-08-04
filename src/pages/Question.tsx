import { useParams } from "react-router-dom"
import { AngleQuestion } from "../components/AngleQuestion";

export function Question() {
    const { type } = useParams()

    // To be built upon further when other question types are added
    if (type === "angle") return <AngleQuestion/>
}