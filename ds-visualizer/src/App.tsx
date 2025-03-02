
import React from 'react';
import './Components/allVisualizer.css';
import './App.css';
import BSVisualizer from './Components/BSVisualizer';
import QuickSortVisualizer from './Components/QSVisualizer';
import MergeSortVisualizer from './Components/MSVisualizer';
import HeapSortVisualizer from './Components/HSVisualizer';
import BFSVisualizer from './Components/BFSVisualizer';
import DFSVisualizer from './Components/DFSVisualizer';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Algorithm Visualizer</h1>
			</header>
			<main>
				<h2 className="section-title">Sorting</h2>
				<div className="visualizer-grid">
					<BSVisualizer />
					<QuickSortVisualizer />
					<MergeSortVisualizer />
					<HeapSortVisualizer />
				</div>
				<hr className="section-divider" />
				<h2 className="section-title">Searching</h2>
				<div className="visualizer-grid">
					<BFSVisualizer />
					<DFSVisualizer />
				</div>
			</main>
		</div>
	);
}

export default App;

