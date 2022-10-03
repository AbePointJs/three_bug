import { Environment, OrbitControls, Preload, TransformControls, View } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { createContext, Suspense, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import useRefs from "react-use-refs";
import Homepage from "./Homepage";
import OtherPage from "./OtherPage";
import "./styles.css";
import { Duck, Soda } from "./Models";

export const PageContext = createContext();
export const RefsContext = createContext();

export default function App() {
	const [canvasWrapperRef, canvasView1, canvasView2] = useRefs();
	const canvasRefs = { canvasView1, canvasView2 };

	return (
		<div className="App">
			<div ref={canvasWrapperRef}>
				<Suspense fallback={null}>
					<Routes>
						<Route path="/" element={<Homepage ref={canvasRefs} />} />
						<Route path="/other" element={<OtherPage ref={canvasRefs} />} />
					</Routes>
					<Canvas
						onCreated={(state) => {
							console.log("canvas created");
							state.events.connect(canvasWrapperRef.current);
						}}
						className="canvas"
					>
						<View track={canvasView1}>
							<Scene />
							<TransformControls>
								<Soda scale={6} position={[0, -1.6, 0]} />
							</TransformControls>
							<OrbitControls makeDefault />
						</View>
						<View track={canvasView2}>
							<color attach="background" args={["lightblue"]} />
							<Scene />
							<TransformControls position={[0, -1, 0]}>
								<Duck scale={2} position={[0, -1.6, 0]} />
							</TransformControls>
							<OrbitControls makeDefault />
						</View>
						<Preload all />
					</Canvas>
				</Suspense>
			</div>
		</div>
	);
}

function Scene() {
	return (
		<>
			<ambientLight intensity={1} />
			<Environment preset="dawn" />
			<OrbitControls autoRotate />
		</>
	);
}
