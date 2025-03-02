
import React, { useState } from 'react';
import { quickSortGenerator, QuickSortState } from '../Algorithms/quickSort';
import './allVisualizer.css';

const QuickSortVisualizer: React.FC = () => {
	const initialArray = [8, 4, 7, 2, 11, 1, 3, 5, 8, 12, 14, 17, 15, 6, 18, 19, 20];

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
			await sleep(300);
		}

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
		<div className="visualizer-container">
			<h2 className="algo-title">Quick Sort</h2>
			<p className="visualizer-description">
				This algorithm selects a pivot element from an array and then partitions the remaining elements into two sub-arrays based on if they are larger or smaller then the pivot, last it recursivly sorts each sub-array until finished.
			</p>

			<div className="chart-area">
				{array.map((value, index) => {
					let barColor = '#343a40';

					if (index === pivotIndex) {
						barColor = 'orange';
					}
					else if (activeIndices.includes(index)) {
						barColor = 'red';
					}

					return (
						<div
							key={index}
							className="bar"
							style={{
								display: 'inline-block',
								height: `${value * 10}px`,
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

export default QuickSortVisualizer;
