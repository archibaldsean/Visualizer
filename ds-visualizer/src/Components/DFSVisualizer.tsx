
import React, { useState } from 'react';
import { dfs, DFSState } from '../Algorithms/dfs';
import './allvisualizers.css';

const DFSVisualizer: React.FC = () => {
	// Example adjacency list for a 7-node graph:
	// Node 0 connects to 1 and 2; Node 1 connects to 0, 3, and 4; etc.
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

	// Helper function for delays (animation)
	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	const runDFS = async () => {
		setIsRunning(true);
		const generator = dfs(adjacencyList, 0);
		for (const state of generator) {
			setDfsState(state);
			await sleep(500); // adjust delay as needed
		}
		setIsRunning(false);
	};

	const resetDFS = () => {
		setDfsState({ visited: [], stack: [], current: null });
	};

	return (
		<div className="visualizer-container">
			<h2 className="algo-title">Depth First Search (DFS)</h2>
			<p className="visualizer-description">
				This visualizer demonstrates DFS on a fixed graph using a stack. It shows the current node, visited nodes, and the stack.
			</p>

			<div className="chart-area">
				<div className="dfs-display">
					<div>
						<strong>Current Node:</strong> {dfsState.current !== null ? dfsState.current : 'None'}
					</div>
					<div>
						<strong>Visited:</strong> {dfsState.visited.join(', ') || 'None'}
					</div>
					<div>
						<strong>Stack:</strong> {dfsState.stack.join(', ') || 'Empty'}
					</div>
				</div>
			</div>

			<div className="control-panel">
				<button onClick={runDFS} disabled={isRunning}>
					Start DFS
				</button>
				<button onClick={resetDFS} disabled={isRunning}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default DFSVisualizer;
