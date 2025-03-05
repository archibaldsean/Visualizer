
import React, { useState } from 'react';
import { dfs, DFSState } from '../Algorithms/dfs';
import './allVisualizer.css';

const DFSVisualizer: React.FC = () => {
	const nodePositions = [
		{ x: 300, y: 100 }, // Node 0
		{ x: 175, y: 200 }, // Node 1
		{ x: 425, y: 200 }, // Node 2
		{ x: 125, y: 300 }, // Node 3
		{ x: 225, y: 300 }, // Node 4
		{ x: 375, y: 300 }, // Node 5
		{ x: 475, y: 300 }, // Node 6
	];

	//Edges in [source, target] form. 
	const edges = [
		[0, 1],
		[0, 2],
		[1, 3],
		[1, 4],
		[2, 5],
		[2, 6],
	];

	const adjacencyList = [
		[1, 2],    // Node 0
		[0, 3, 4], // Node 1
		[0, 5, 6], // Node 2
		[1],       // Node 3
		[1],       // Node 4
		[2],       // Node 5
		[2],       // Node 6
	];

	const [dfsState, setDfsState] = useState<DFSState>({ visited: [], stack: [], current: null });
	const [isRunning, setIsRunning] = useState(false);

	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const runDFS = async () => {
		setIsRunning(true);
		const generator = dfs(adjacencyList, 0);
		for (const state of generator) {
			setDfsState(state);
			await sleep(500);
		}
		setIsRunning(false);
	};

	const resetDFS = () => {
		setDfsState({ visited: [], stack: [], current: null });
	};

	const { visited, stack, current } = dfsState;

	return (
		<div className="visualizer-container">
			<h2 className="algo-title">Depth First Search (DFS)</h2>
			<p className="visualizer-description">
				This algorithm searches all the way to the bottom of a branch before backtracking to search another branch. This way of searching is ideal for doing an exhastive search to search all possible solutions within a graph/tree.
			</p>

			<div className="chart-area">
				<div className="heap-array">

					<div className='visualizer-queue'>
						<strong>Stack:</strong> {stack.length ? stack.join(', ') : 'Empty'}
					</div>
					<svg width="600" height="320">
						<defs>
							{/* Arrow marker definition */}
							<marker
								id="arrow"
								markerWidth="10"
								markerHeight="10"
								refX="6"
								refY="3"
								orient="auto"
								markerUnits="strokeWidth"
							>
								<path d="M0,0 L0,6 L6,3 z" fill="#999" />
							</marker>
						</defs>
						{/* Draw edges with arrows */}
						{edges.map(([src, dst], i) => {
							const { x: x1, y: y1 } = nodePositions[src];
							const { x: x2, y: y2 } = nodePositions[dst];
							return (
								<line
									key={i}
									x1={x1}
									y1={y1}
									x2={x2}
									y2={y2}
									stroke="#999"
									strokeWidth="2"
									markerEnd="url(#arrow)"
								/>
							);
						})}
						{/* Draw nodes (circles + labels) */}
						{nodePositions.map(({ x, y }, idx) => {
							// Default fill color
							let fillColor = '#343a40';
							// Mark visited
							if (visited.includes(idx)) {
								fillColor = '#6c757d'; // a lighter gray
							}
							// Mark current
							if (idx === current) {
								fillColor = '#dc3545'; // red
							}

							return (
								<g key={idx}>
									<circle
										cx={x}
										cy={y}
										r={15}
										fill={fillColor}
										stroke="#999"
										strokeWidth="2"
									/>
									<text
										x={x}
										y={y + 5}
										textAnchor="middle"
										fill="#fff"
										fontWeight="bold"
									>
										{idx}
									</text>
								</g>
							);
						})}
					</svg>
				</div>
			</div>

			<div className="control-panel">
				<button onClick={runDFS} disabled={isRunning}>Start</button>
				<button onClick={resetDFS} disabled={isRunning}>Reset</button>
			</div>
		</div>
	);
};

export default DFSVisualizer;
