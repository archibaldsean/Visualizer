
// BSVisualizer.tsx
import React, { useState } from 'react';
import './allVisualizer.css';
import { bubbleSort, AlgorithmState } from '../Algorithms/bubbleSort';

const BSVisualizer: React.FC = () => {
	const initialArray = [5, 3, 8, 4, 2, 7, 1, 6, 12, 9, 3, 10, 15, 11, 17, 18, 20];
	const [array, setArray] = useState<number[]>(initialArray);
	const [currentIndices, setCurrentIndices] = useState<[number, number] | null>(null);
	const [isSorting, setIsSorting] = useState(false);

	// Run bubble sort step-by-step
	const handleStart = async () => {
		setIsSorting(true);
		const arrCopy = [...array];
		const generator = bubbleSort(arrCopy);
		for (const state of generator) {
			setArray(state.array);
			setCurrentIndices(state.currentIndices);
			await new Promise(res => setTimeout(res, 300));
		}
		setIsSorting(false);
	};

	// Reset to the initial array
	const handleReset = () => {
		setArray(initialArray);
		setIsSorting(false);
	};
	return (
		<div className="visualizer-container">
			<h2 className="algo-title">Bubble Sort</h2>
			<p className="visualizer-description">
				Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
				compares adjacent elements and swaps them if they are in the wrong order.
				The pass through the list is repeated until the list is sorted.
			</p>

			<div className="chart-area">
				{array.map((value, index) => {
					const isActive = currentIndices && (index === currentIndices[0] || index === currentIndices[1]);
					return (
						<div
							key={index}
							className="bar"
							style={{
								height: `${value * 10}px`,
								backgroundColor: isActive ? 'red' : '#343a40',
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

export default BSVisualizer;

