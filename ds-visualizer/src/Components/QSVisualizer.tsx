
import React, { useState } from 'react';
import { quickSortGenerator, QuickSortState } from '../Algorithms/quickSort';
import './QuickSortVisualizer.css';

const QuickSortVisualizer: React.FC = () => {
	const initialArray = [8, 4, 7, 2, 11, 1, 3];

	const [array, setArray] = useState<number[]>(initialArray);
	const [pivotIndex, setPivotIndex] = useState<number | null>(null);
	const [activeIndices, setActiveIndices] = useState<number[]>([]);
	const [isSorting, setIsSorting] = useState(false);

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const handleStart = async () => {
		setIsSorting(true);
		const arrCopy = [...array];
		const generator = quickSortGenerator(arrCopy);

		for (const state of generator) {
			setArray(state.array);
			setPivotIndex(state.pivotIndex);
			setActiveIndices(state.activeIndices);
			await sleep(500);
		}

		// After generator finishes, ensure everything resets to gray
		setPivotIndex(null);
		setActiveIndices([]);
		setIsSorting(false);
	};

	const handleReset = () => {
		setArray(initialArray);
		setPivotIndex(null);
		setActiveIndices([]);
	};

	return (
		<div className="qs-container">
			<h2 className="qs-title">Quick Sort</h2>
			<p className="qs-description">
				Bars start & end gray. Pivot is orange; active indices are red.
			</p>

			<div className="qs-chart">
				{array.map((value, index) => {
					// Default color: gray
					let barColor = '#6c757d';

					// Pivot => orange
					if (index === pivotIndex) {
						barColor = 'orange';
					}
					// Active => red
					else if (activeIndices.includes(index)) {
						barColor = 'red';
					}

					return (
						<div
							key={index}
							className="qs-bar"
							style={{
								height: `${value * 10}px`,
								backgroundColor: barColor,
							}}
						/>
					);
				})}
			</div>

			<div className="qs-controls">
				<button onClick={handleStart} disabled={isSorting}>Start</button>
				<button onClick={handleReset} disabled={isSorting}>Reset</button>
			</div>
		</div>
	);
};

export default QuickSortVisualizer;
