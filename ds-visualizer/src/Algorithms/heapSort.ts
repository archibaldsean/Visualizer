
export type HeapSortState = {
	array: number[];
	activeIndices: number[]; // which indices are being swapped or compared
};

/**
 * Makes sure the subtree at index i is a max heap,
 * yielding states whenever a swap occurs.
 */
function* heapify(arr: number[], n: number, i: number): Generator<HeapSortState> {
	let largest = i;
	const left = 2 * i + 1;
	const right = 2 * i + 2;

	if (left < n && arr[left] > arr[largest]) {
		largest = left;
	}
	if (right < n && arr[right] > arr[largest]) {
		largest = right;
	}

	if (largest !== i) {
		[arr[i], arr[largest]] = [arr[largest], arr[i]];
		// Yield after swap
		yield { array: [...arr], activeIndices: [i, largest] };

		yield* heapify(arr, n, largest);
	} else {
		// Optionally yield a "no-op" step with empty activeIndices
		yield { array: [...arr], activeIndices: [] };
	}
}

/**
 * Builds a max heap, then extracts elements one by one,
 * yielding intermediate states for visualization.
 */
export function* heapSortGenerator(inputArr: number[]): Generator<HeapSortState> {
	const arr = [...inputArr];
	const n = arr.length;

	// Build max heap
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		yield* heapify(arr, n, i);
	}

	// Extract elements from the heap
	for (let i = n - 1; i > 0; i--) {
		[arr[0], arr[i]] = [arr[i], arr[0]];
		yield { array: [...arr], activeIndices: [0, i] };

		yield* heapify(arr, i, 0);
	}

	// Final sorted state
	yield { array: [...arr], activeIndices: [] };
}
