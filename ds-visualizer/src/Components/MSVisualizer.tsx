
// MergeSortVisualizer.tsx
import React, { useState } from 'react';
import { mergeSortGenerator, MergeSortState } from '../Algorithms/mergeSort';
import './Visualizer.css'; // or your consolidated CSS file

const MergeSortVisualizer: React.FC = () => {
	// You can pick any initial array or generate a random one
	const initialArray = [5, 2, 9, 1, 7, 3, 8];
	const [array, setArray] = useState<number[]>(initialArray);

	// Track subarray boundaries for highlighting
	const [left, setLeft] = useState<number | null>(null);
	const [mid, setMid] = useState<number | null>(null);
	const [right, setRight] = useState<number | null>(null);

	// Track active indices for highlighting comparisons or writes
	const [activeIndices, setActiveIndices] = useState<number[]>([]);
	const [isSorting, setIsSorting] = useState(false);

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const handleStart = async () => {
		setIsSorting(true);
		const arrCopy = [...array];
		const generator = mergeSortGenerator(arrCopy);

		for (const state of generator) {
			setArray(state.array);
			setLeft(state.left);
			setMid(state.mid);
			setRight(state.right);
			setActiveIndices(state.activeIndices);
			await sleep(500); // adjust speed
		}

		// After sorting finishes, reset highlights
		setLeft(null);
		setMid(null);
		setRight(null);
		setActiveIndices([]);
		setIsSorting(false);
	};

	const handleReset = () => {
		setArray(initialArray);
		setLeft(null);
		setMid(null);
		setRight(null);
		setActiveIndices([]);
	};

	return (
		<div className="visualizer-container">
			<h2 className="algo-title">Merge Sort</h2>
			<p className="visualizer-description">
				Visualizing Merge Sort. Bars are highlighted during comparisons and merges.
			</p>

			<div className="chart-area">
				{/* The bars for the array */}
				{array.map((value, index) => {
					// Default color: gray
					let barColor = '#6c757d';

					// If index is in activeIndices => red
					if (activeIndices.includes(index)) {
						barColor = '#dc3545';
					}

					return (
						<div
							key={index}
							className="bar"
							style={{
								height: `${value * 20}px`,
								backgroundColor: barColor,
							}}
						/>
					);
				})}
			</div>

			<div className="control-panel">
				<button onClick={handleStart} disabled={isSorting}>Start</button>
				<button onClick={handleReset} disabled={isSorting}>Reset</button>
			</div>
		</div>
	);
};

export default MergeSortVisualizer;
