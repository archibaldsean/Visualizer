
import React from 'react';
import BSVisualizer from './components/BSVisualizer';
import QuickSortVisualizer from './Components/QSVisualizer';
import MergeSortVisualizer from './Components/MSVisualizer';
import HeapSortVisualizer from './Components/HSVisualizer';
import BFSVisualizer from './Components/BFSVisualizer';
import DFSVisualizer from './Components/DFSVisualizer';

const App: React.FC = () => {
	return (
		<div>
			<header>
				<h1>Algorithm Visualizer</h1>
			</header>
			<main>
				{/* You can add sections or a grid layout here */}
				<section>
					<h2>Sorting Algorithms</h2>
					<BSVisualizer />
					<QuickSortVisualizer />
					<MergeSortVisualizer />
					<HeapSortVisualizer />
				</section>
				<section>
					<h2>Searching Algorithms</h2>
					<BFSVisualizer />
					<DFSVisualizer />
				</section>
			</main>
		</div>
	);
};

export default App;
