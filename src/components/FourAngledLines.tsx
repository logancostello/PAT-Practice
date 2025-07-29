import { AngledLines } from "./AngledLines";
import { useMemo } from "react";

type FourAngledLinesProps = {
    angles: number[];
    hasSubmitted: boolean;
}

export function FourAngledLines({ angles, hasSubmitted }: FourAngledLinesProps) {
    const randomRotation: number = useMemo(() => Math.random() * 360, [angles]);

    return (
        <div style={{ display: 'flex' }}>
            {angles.map((a, i) => 
                <AngledLines 
                angle={a} 
                rotation={randomRotation}
                size={250} 
                label={(i + 1) + (hasSubmitted ? ". " + a + "°" : "")}
                hasSubmitted={hasSubmitted} 
                />
        )}
    </div>    
    )
}
