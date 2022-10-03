import React from "react";
import { Link } from "react-router-dom";

const OtherPage = React.forwardRef((props, ref) => {
	const { canvasView1, canvasView2 } = ref;

	return (
		<>
			<div ref={canvasView1} />
			<h1>Other Page</h1>
			<Link to="/">Homepage</Link>
			<br />
			<p>Position 3 - Duck</p>
			<div
				ref={canvasView2}
				style={{
					width: "100px",
					height: "200px",
					display: "inline-block",
				}}
			/>
		</>
	);
});

export default OtherPage;
