
export type BFSState = {
	visited: number[];
	queue: number[];
	current: number | null;
};

export function* bfs(adjList: number[][], start: number): Generator<BFSState> {
	const visitedSet = new Set<number>();
	const queue: number[] = [start];
	visitedSet.add(start);

	while (queue.length > 0) {
		const current = queue.shift()!;

		// Yield state before processing neighbors
		yield {
			visited: Array.from(visitedSet),
			queue: [...queue],
			current,
		};

		for (const neighbor of adjList[current]) {
			if (!visitedSet.has(neighbor)) {
				visitedSet.add(neighbor);
				queue.push(neighbor);

				// Yield state after adding a neighbor
				yield {
					visited: Array.from(visitedSet),
					queue: [...queue],
					current,
				};
			}
		}
	}

	// Final state: no nodes left in the queue
	yield {
		visited: Array.from(visitedSet),
		queue: [],
		current: null,
	};
}
