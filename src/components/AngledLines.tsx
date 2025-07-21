import { Line } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'

type AngleLinesProps = {
  angle: number;    // angle in degrees
};

export function AngledLinesScene({ angle }: AngleLinesProps) {
    const angleInRadians = angle / 360 * 2 * Math.PI;
    const length = 4;
    const end2: [number, number, number] = [length * Math.cos(angleInRadians), length * Math.sin(angleInRadians), 0];

    return (
    <>
        <Canvas camera={{ position: [0, 0, 5] }}>
            <color attach="background" args={["white"]} />
            <ambientLight />
            <Line points={[[0, 0, 0], [length, 0, 0]]} color="black" lineWidth={2} />
            <Line points={[[0, 0, 0], end2]} color="black" lineWidth={2} />
        </Canvas>
    </>
    );
}
