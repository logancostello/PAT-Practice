import { AngledLines } from "./AngledLines";

function popRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex, 1)[0];
}

type FourAngledLinesProps = {
    trueAngle: number;
    angleOffset: number;
}

export function FourAngledLines({ trueAngle, angleOffset }: FourAngledLinesProps) {

    const randomRotation: number = Math.random() * 360;

    const potentialAngles: number[] = [
        trueAngle - 3 * angleOffset,
        trueAngle - 2 * angleOffset,
        trueAngle - angleOffset,
        trueAngle,
        trueAngle + angleOffset,
        trueAngle + 2 * angleOffset,
        trueAngle + 3 * angleOffset,
    ];

    const firstAngleIndex = Math.floor(Math.random() * 4);
    const fourAngles = potentialAngles.slice(firstAngleIndex, firstAngleIndex + 4);

    const angle1 = popRandomElement(fourAngles);
    const angle2 = popRandomElement(fourAngles);
    const angle3 = popRandomElement(fourAngles);
    const angle4 = popRandomElement(fourAngles);

    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            <AngledLines 
                angle={angle1} 
                rotation={randomRotation}
                size={200} 
                label={angle1} 
            />
            <AngledLines 
                angle={angle2} 
                rotation={randomRotation}
                size={200} 
                label={angle2} 
            />
            <AngledLines 
                angle={angle3} 
                rotation={randomRotation}
                size={200} 
                label={angle3} 
            />
            <AngledLines 
                angle={angle4} 
                rotation={randomRotation}
                size={200} 
                label={angle4} 
            />

        </div>
        
        
    )
}