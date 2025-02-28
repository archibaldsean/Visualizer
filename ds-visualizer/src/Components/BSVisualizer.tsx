import React, { useState } from 'react';
import { bubbleSort } from '../Algorithms/bubbleSort';

const BSVisualizer: React.FC = () => {
	const [array, setArray] = useState([5, 3, 8, 4, 2, 7]);
	const [isSorting, setIsSorting] = useState(false);

	const handleSort = async () => {
		setIsSorting(true);
		const generator = bubbleSort(array);
		for (const nextArray of generator) {
			setArray(nextArray);
			await new Promise(res => setTimeout(res, 500)); // small delay
		}
		setIsSorting(false);
	};

	return (
		<div>
			<h3>Bubble Sort Visualizer</h3>
			<div>
				{array.map((value, idx) => (
					<div key={idx} style={{
						display: 'inline-block',
						width: '20px',
						height: `${value * 10}px`,
						backgroundColor: 'blue',
						margin: '2px'
					}} />
				))}
			</div>
			<button onClick={handleSort} disabled={isSorting}>
				Start Sort
			</button>
		</div>
	);
};

export default BSVisualizer;

