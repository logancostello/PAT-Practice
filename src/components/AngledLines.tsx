import { Line } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';

type AngleInput = {
	angle: number;    // angle in degrees
	line1Length: number;
	line2Length: number;
};

type AngleLinesProps = {
	angleInput: AngleInput;
	rotation: number; // rotation in degrees
	size: number;     // pixels
	label: number;
};

type Point3D = [number, number, number];

export function AngledLinesScene({ angleInput, rotation, size, label }: AngleLinesProps) {
	const CAMERA_Z = 5;
	const FOV = 75;
	const ASPECT_RATIO = 1;
	const TARGET_SIZE_RATIO = 0.5;
	const RANDOM_TRANSLATE_RANGE = 0.35;
	const RANDOM_ROTATION_RANGE = 0.35;
	const RANDOM_LENGTH_RANGE = 2.25;

	// Add small random adjustments to inputs
	const adjustedAngle = angleInput.angle + (Math.random() - 0.5) * 10; // ±5 degrees
	const adjustedRotation = rotation + (Math.random() - 0.5) * 20; // ±10 degrees
	const adjustedLine1Length = angleInput.line1Length - Math.random() * RANDOM_LENGTH_RANGE;
	const adjustedLine2Length = angleInput.line2Length - Math.random() * RANDOM_LENGTH_RANGE;

	// Randomly add reflections
    // 1/2 chance of nothing
    // 1/6 chance of just x reflection
    // 1/6 chance of just y reflection
    // 1/6 chance of both reflections
	let reflectX = false;
	let reflectY = false;

	if (Math.random() > 0.5) { 
        const reflectionChance = Math.random();
		if (reflectionChance > 0.66) {
			reflectX = true; 
		} else if (reflectionChance > 0.33) {
			reflectY = true; 
		} else {
            reflectX = true;
            reflectY = true; 
        }
	}

	// Convert angles to radians
	const angleInRadians = (adjustedAngle * Math.PI) / 180;
	const rotationInRadians = (adjustedRotation * Math.PI) / 180;
	const reflectXFactor = reflectX ? -1 : 1;
	const reflectYFactor = reflectY ? -1 : 1;

	// Calculate visible world dimensions
	const vFOV = (FOV * Math.PI) / 180;
	const visibleHeight = 2 * Math.tan(vFOV / 2) * CAMERA_Z;
	const visibleWidth = visibleHeight * ASPECT_RATIO;
	const targetSize = Math.min(visibleWidth, visibleHeight) * TARGET_SIZE_RATIO;

	// Calculate line endpoints with adjusted lengths and apply base rotation
	const cos = Math.cos(rotationInRadians);
	const sin = Math.sin(rotationInRadians);

	const end1BeforeRotation: Point3D = [adjustedLine1Length, 0, 0];
	const end1: Point3D = [
		end1BeforeRotation[0] * cos - end1BeforeRotation[1] * sin,
		end1BeforeRotation[0] * sin + end1BeforeRotation[1] * cos,
		0
	];

	const end2BeforeRotation: Point3D = [
		adjustedLine2Length * Math.cos(angleInRadians),
		adjustedLine2Length * Math.sin(angleInRadians),
		0
	];
	const end2: Point3D = [
		end2BeforeRotation[0] * cos - end2BeforeRotation[1] * sin,
		end2BeforeRotation[0] * sin + end2BeforeRotation[1] * cos,
		0
	];

	// Calculate bounding box
	const allPoints: Point3D[] = [
		[0, 0, 0],
		end1,
		end2
	];

	const bounds = {
		minX: Math.min(...allPoints.map(p => p[0])),
		maxX: Math.max(...allPoints.map(p => p[0])),
		minY: Math.min(...allPoints.map(p => p[1])),
		maxY: Math.max(...allPoints.map(p => p[1]))
	};

	const currentWidth = bounds.maxX - bounds.minX;
	const currentHeight = bounds.maxY - bounds.minY;
	const currentSize = Math.max(currentWidth, currentHeight);
	const scaleFactor = targetSize / currentSize;

	// Calculate center point
	const centerX = (bounds.minX + bounds.maxX) / 2;
	const centerY = (bounds.minY + bounds.maxY) / 2;

	// Create line points with scaling, centering, and reflections
	const createScaledPoint = (x: number, y: number): Point3D => [
		(x - centerX) * scaleFactor * reflectXFactor,
		(y - centerY) * scaleFactor * reflectYFactor,
		0
	];

	const line1Points: Point3D[] = [
		createScaledPoint(0, 0),
		createScaledPoint(end1[0], end1[1])
	];

	const line2Points: Point3D[] = [
		createScaledPoint(0, 0),
		createScaledPoint(end2[0], end2[1])
	];

	// Generate random transformation values
	const randomTranslateX = (Math.random() - 0.5) * RANDOM_TRANSLATE_RANGE;
	const randomTranslateY = (Math.random() - 0.5) * RANDOM_TRANSLATE_RANGE;
	const randomRotationZ = (Math.random() - 0.5) * RANDOM_ROTATION_RANGE;

	// Apply random transformation to a point
	const applyTransform = (point: Point3D): Point3D => {
		const [x, y, z] = point;
		const transformCos = Math.cos(randomRotationZ);
		const transformSin = Math.sin(randomRotationZ);

		return [
			x * transformCos - y * transformSin + randomTranslateX,
			x * transformSin + y * transformCos + randomTranslateY,
			z
		];
	};

	// Transform all points
	const transformedLine1Points = line1Points.map(applyTransform);
	const transformedLine2Points = line2Points.map(applyTransform);

	return (
		<div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
			{/* Angled Lines */}
			<div style={{ width: `${size}px`, height: `${size}px` }}>
				<Canvas camera={{ position: [0, 0, CAMERA_Z] }}>
					<color attach="background" args={["lightgray"]} />
					<ambientLight />
					<Line points={transformedLine1Points} color="black" lineWidth={2} />
					<Line points={transformedLine2Points} color="black" lineWidth={2} />
				</Canvas>
			</div>
			{/* Label Number */}
			<div style={{
				position: 'absolute',
				bottom: '4px',
				left: '50%',
				transform: 'translateX(-50%)',
				fontSize: '18px',
				fontWeight: 'bold',
				color: 'black',
				pointerEvents: 'none'
			}}>
				{label}
			</div>
		</div>
	);
}