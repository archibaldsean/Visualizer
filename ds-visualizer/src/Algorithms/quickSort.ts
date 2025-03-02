
export type QuickSortState = {
	array: number[];
	pivotIndex: number | null;
	activeIndices: number[];
};


// Partition snippet
function* partition(
	array: number[],
	left: number,
	right: number
): Generator<QuickSortState, number, unknown> {
	const pivotIndex = right;
	const pivotValue = array[pivotIndex];
	let i = left;

	for (let j = left; j < right; j++) {
		// 1) Yield before comparison
		yield {
			array: [...array],
			pivotIndex,
			activeIndices: [j, pivotIndex],
		};

		if (array[j] < pivotValue) {
			[array[i], array[j]] = [array[j], array[i]];
			i++;

			// 2) Yield after swap
			yield {
				array: [...array],
				pivotIndex,
				activeIndices: [i, j], // highlight the swapped indices
			};
		}
	}

	// 3) Move pivot to correct position
	[array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];

	// Yield final state of partition
	yield {
		array: [...array],
		pivotIndex: i,
		activeIndices: [], // no specific bars highlighted now
	};

	return i;
}


export function* quickSortGenerator(
	array: number[],
	left = 0,
	right = array.length - 1
): Generator<QuickSortState> {
	if (left < right) {
		const pivotPos = yield* partition(array, left, right);
		yield* quickSortGenerator(array, left, pivotPos - 1);
		yield* quickSortGenerator(array, pivotPos + 1, right);
	} else {
		yield {
			array: [...array],
			pivotIndex: null,
			activeIndices: [],
		};
	}
}
