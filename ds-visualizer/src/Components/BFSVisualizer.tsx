

import React, { useState } from 'react';
import './allVisualizer.css';
import { bfs, BFSState } from '../Algorithms/bfs';

/** 
 * Example positions for a 7-node tree (0..6). 
 * Adjust coordinates as desired for a nicer layout.
 */
const nodePositions = [
	{ x: 300, y: 100 }, // Node 0
	{ x: 175, y: 200 }, // Node 1
	{ x: 425, y: 200 }, // Node 2
	{ x: 125, y: 300 }, // Node 3
	{ x: 225, y: 300 }, // Node 4
	{ x: 375, y: 300 }, // Node 5
	{ x: 475, y: 300 }, // Node 6
];

/** 
 * Edges in [source, target] form. 
 * We'll draw arrows from source -> target.
 */
const edges = [
	[0, 1],
	[0, 2],
	[1, 3],
	[1, 4],
	[2, 5],
	[2, 6],
];

/** 
 * Adjacency list for the same 7-node tree. 
 * e.g. Node 0 connects to 1 & 2, Node 1 connects to 0,3,4, etc.
 */
const adjacencyList = [
	[1, 2],    // Node 0
	[0, 3, 4], // Node 1
	[0, 5, 6], // Node 2
	[1],       // Node 3
	[1],       // Node 4
	[2],       // Node 5
	[2],       // Node 6
];

const BFSVisualizer: React.FC = () => {
	const [visited, setVisited] = useState<number[]>([]);
	const [queue, setQueue] = useState<number[]>([]);
	const [current, setCurrent] = useState<number | null>(null);
	const [isRunning, setIsRunning] = useState(false);

	// Helper to pause between steps
	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const handleStart = async () => {
		setIsRunning(true);

		// Create BFS generator from node 0
		const generator = bfs(adjacencyList, 0);

		// Step through BFS states
		for (const state of generator) {
			setVisited(state.visited);
			setQueue(state.queue);
			setCurrent(state.current);
			await sleep(500); // adjust speed as you like
		}

		setIsRunning(false);
	};

	const handleReset = () => {
		setVisited([]);
		setQueue([]);
		setCurrent(null);
	};

	return (
		<div className="visualizer-container">
			{/* Title/description can be on the dark background if you prefer */}
			<h2 className="algo-title">Breadth First Search</h2>
			<p className="visualizer-description">
				A 7-node tree BFS example. Starting at node 0, the algorithm visits neighbors in layers.
			</p>

			{/* White card for the graph and controls */}
			<div className="chart-area">
				{/* SVG for nodes & arrows */}
				<div className="bfs-graph-area">
					<div className='visualizer-queue'>
						<strong>Queue:</strong> {queue.length ? queue.join(', ') : 'Empty'}
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

				{/* Buttons & queue display */}
				<div className="control-panel">
					<button onClick={handleStart} disabled={isRunning}>Start</button>
					<button onClick={handleReset} disabled={isRunning}>Reset</button>
				</div>
			</div>
		</div>
	);
};

export default BFSVisualizer;

