import { Environment, OrbitControls, Preload, TransformControls } from "@react-three/drei";
import { View } from "./View.tsx";
import { Canvas } from "@react-three/fiber";
import React, { createContext, Suspense, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useRefs from "react-use-refs";
import Homepage from "./Homepage";
import OtherPage from "./OtherPage";
import "./styles.css";
import { Duck, Soda } from "./Models";

export const PageContext = createContext();
export const RefsContext = createContext();

export default function App() {
	const [canvasWrapperRef, canvasView1, canvasView2] = useRefs();
	const location = useLocation();

	// const location = useLocation();
	const [update, setUpdate] = useState();

	const canvasRefs = { canvasView1, canvasView2 };

	useEffect(() => {
		setUpdate((e) => !e);
	}, [location]);

	return (
		<div className="App">
			<div ref={canvasWrapperRef}>
				<Routes>
					<Route path="/" element={<Homepage ref={canvasRefs} />} />
					<Route path="/other" element={<OtherPage ref={canvasRefs} />} />
				</Routes>

				<Suspense fallback={null}>
					<Canvas
						onCreated={(state) => {
							state.events.connect(canvasWrapperRef.current);
						}}
						className="canvas"
					>
						<View track={canvasView1} update={update}>
							<Scene />
							<TransformControls>
								<Soda scale={6} position={[0, -1.6, 0]} />
							</TransformControls>
							<OrbitControls autoRotate />
						</View>

						<View track={canvasView2} update={update}>
							<color attach="background" args={["lightblue"]} />
							<Scene />
							<TransformControls position={[0, -1, 0]}>
								<Duck scale={2} position={[0, -1.6, 0]} />
							</TransformControls>
							<OrbitControls autoRotate />
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
			{/* <OrbitControls autoRotate /> */}
		</>
	);
}
