
export type DFSState = {
	visited: number[];
	stack: number[];
	current: number | null;
};

export function* dfs(adjList: number[][], start: number): Generator<DFSState> {
	const visitedSet = new Set<number>();
	const stack: number[] = [start];

	while (stack.length > 0) {
		// Pop the top element 
		const current = stack.pop()!;

		if (!visitedSet.has(current)) {
			visitedSet.add(current);

			// Yield state after visiting a new node
			yield {
				visited: Array.from(visitedSet),
				stack: [...stack],
				current,
			};

			// Push neighbors in reverse order so that they are processed in original order
			for (let i = adjList[current].length - 1; i >= 0; i--) {
				const neighbor = adjList[current][i];
				if (!visitedSet.has(neighbor)) {
					stack.push(neighbor);
				}
			}

			// Yield state after adding neighbors
			yield {
				visited: Array.from(visitedSet),
				stack: [...stack],
				current,
			};
		} else {
			// Optionally yield state even if current was already visited
			yield {
				visited: Array.from(visitedSet),
				stack: [...stack],
				current,
			};
		}
	}

	// Final state: DFS complete.
	yield {
		visited: Array.from(visitedSet),
		stack: [],
		current: null,
	};
}

