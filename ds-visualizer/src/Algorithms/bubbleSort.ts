
export type AlgorithmState = {
	array: number[];
	currentIndices: [number, number] | null;
};

export function* bubbleSort(arr: number[]): Generator<AlgorithmState> {
	let n = arr.length;
	let array = [...arr];
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			// Yield state before potential swap
			yield { array: [...array], currentIndices: [j, j + 1] };
			if (array[j] > array[j + 1]) {
				// Swap the elements
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
				// Yield state after swap
				yield { array: [...array], currentIndices: [j, j + 1] };
			}
		}
	}
	// Final state with no highlighted indices
	yield { array: [...array], currentIndices: null };
}

