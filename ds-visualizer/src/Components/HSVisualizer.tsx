
// src/components/HeapSortVisualizer.tsx
import React, { useState } from 'react';
import { heapSortGenerator, HeapSortState } from '../Algorithms/heapSort';
import './allVisualizer.css';

/** 
 * Dynamically compute (x,y) positions for each node in a complete binary tree.
 * This places the root near the top (startY), each level separated by levelHeight,
 * and each node horizontally spaced within svgWidth.
 */
function buildHeapNodePositions(
	n: number,
	svgWidth = 600,
	startY = 60,
	levelHeight = 80
): { x: number; y: number }[] {
	const positions: { x: number; y: number }[] = [];
	for (let i = 0; i < n; i++) {
		const level = Math.floor(Math.log2(i + 1));
		const posInLevel = i - (2 ** level - 1);
		const nodesInLevel = 2 ** level;

		const xSpacing = svgWidth / (nodesInLevel + 1);
		const x = xSpacing * (posInLevel + 1);
		const y = startY + level * levelHeight;

		positions.push({ x, y });
	}
	return positions;
}

const HeapSortVisualizer: React.FC = () => {
	// Example initial array
	const initialArray = [12, 7, 9, 3, 15, 10, 5];
	const [array, setArray] = useState<number[]>(initialArray);
	const [activeIndices, setActiveIndices] = useState<number[]>([]);
	const [isSorting, setIsSorting] = useState(false);

	// For animation speed
	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const handleStart = async () => {
		setIsSorting(true);
		const arrCopy = [...array];
		const generator = heapSortGenerator(arrCopy);

		for (const state of generator) {
			setArray(state.array);
			setActiveIndices(state.activeIndices);
			await sleep(600); // adjust as you like
		}

		setActiveIndices([]);
		setIsSorting(false);
	};

	const handleReset = () => {
		setArray(initialArray);
		setActiveIndices([]);
	};

	// We'll center the heap in an SVG of width 600 and height 320
	const svgWidth = 600;
	const svgHeight = 320;
	const nodePositions = buildHeapNodePositions(array.length, svgWidth, 60, 80);

	return (
		<div className="visualizer-container">
			<h2 className="algo-title">Heap Sort</h2>
			<p className="visualizer-description">
				A 7-node heap example. The tree is centered, and the array is displayed in the bottom-left corner.
			</p>

			<div className="chart-area">
				{/* The heap in an SVG, centered horizontally */}
				<div className="heap-graph-area">
					<svg
						width={svgWidth}
						height={svgHeight}
						style={{ display: 'block', margin: '0 auto' }}
					>
						{/* Draw edges from each node to its children */}
						{array.map((_, i) => {
							const left = 2 * i + 1;
							const right = 2 * i + 2;
							const { x: x1, y: y1 } = nodePositions[i];
							const edges: React.ReactElement[] = [];

							if (left < array.length) {
								const { x: x2, y: y2 } = nodePositions[left];
								edges.push(
									<line
										key={`edge-left-${i}`}
										x1={x1}
										y1={y1}
										x2={x2}
										y2={y2}
										stroke="#999"
										strokeWidth="2"
									/>
								);
							}
							if (right < array.length) {
								const { x: x2, y: y2 } = nodePositions[right];
								edges.push(
									<line
										key={`edge-right-${i}`}
										x1={x1}
										y1={y1}
										x2={x2}
										y2={y2}
										stroke="#999"
										strokeWidth="2"
									/>
								);
							}
							return edges;
						})}

						{/* Draw nodes (circles + text) */}
						{array.map((value, i) => {
							const { x, y } = nodePositions[i];
							const isActive = activeIndices.includes(i);
							const fillColor = isActive ? '#dc3545' : '#343a40';
							return (
								<g key={i}>
									<circle cx={x} cy={y} r={15} fill={fillColor} stroke="#999" strokeWidth="2" />
									<text
										x={x}
										y={y + 5}
										fill="#fff"
										fontWeight="bold"
										textAnchor="middle"
										fontSize="14"
									>
										{value}
									</text>
								</g>
							);
						})}
					</svg>
				</div>

				{/* The array in the bottom-left corner */}
				<div className="heap-array">
					{array.map((value, i) => {
						const isActive = activeIndices.includes(i);
						return (
							<div
								key={i}
								className="array-box"
								style={{ backgroundColor: isActive ? '#dc3545' : '#f9f9f9' }}
							>
								{value}
							</div>
						);
					})}
				</div>
			</div>

			<div className="control-panel">
				<button onClick={handleStart} disabled={isSorting}>Start Heap Sort</button>
				<button onClick={handleReset} disabled={isSorting}>Reset</button>
			</div>
		</div>
	);
};

export default HeapSortVisualizer;
