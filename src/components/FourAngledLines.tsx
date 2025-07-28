import { AngledLines } from "./AngledLines";
import { memo } from "react";

type FourAngledLinesProps = {
    angles: number[];
}

export const FourAngledLines = memo(function FourAngledLines({ angles }: FourAngledLinesProps) {
    const randomRotation: number = Math.random() * 360;

    return (
        <div style={{ display: 'flex' }}>
            <AngledLines 
                angle={angles[0]} 
                rotation={randomRotation}
                size={250} 
                label={1} 
            />
            <AngledLines 
                angle={angles[1]} 
                rotation={randomRotation}
                size={250} 
                label={2} 
            />
            <AngledLines 
                angle={angles[2]} 
                rotation={randomRotation}
                size={250} 
                label={3} 
            />
            <AngledLines 
                angle={angles[3]} 
                rotation={randomRotation}
                size={250} 
                label={4} 
            />

        </div>    
       )
    }
)