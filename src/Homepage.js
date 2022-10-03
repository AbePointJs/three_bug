import React from "react";
import { Link } from "react-router-dom";

const Homepage = React.forwardRef((props, ref) => {
	const { canvasView1, canvasView2 } = ref;

	return (
		<>
			<h1>Homepage</h1>
			<Link to="/other">Other Page</Link>
			<p>Position 1 - Bottle</p>
			<div ref={canvasView1} style={{ height: "100px", width: "100px" }} />
			<p>Position 2 - Apple</p>
			<div ref={canvasView2} style={{ height: "100px", width: "100px" }} />
		</>
	);
});

export default Homepage;
